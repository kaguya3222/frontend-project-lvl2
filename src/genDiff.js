import path from 'path';
import fs from 'fs';
import lodash from 'lodash';

const diffStatuses = {
  deleted: 'deleted',
  steady: 'steady',
  added: 'added',
};

export default (firstFilePath, secondFilePath) => {
  const resolvedFirstFilePath = path.resolve(firstFilePath);
  const resolvedSecondFilePath = path.resolve(secondFilePath);

  const firstFile = fs.readFileSync(resolvedFirstFilePath);
  const secondFile = fs.readFileSync(resolvedSecondFilePath);

  const firstJson = JSON.parse(firstFile);
  const secondJson = JSON.parse(secondFile);

  const diffByFirstJson = Object.entries(firstJson).reduce((acc, [key, value]) => {
    const isDeleted = !secondJson[key];

    if (isDeleted) return [...acc, [key, { status: diffStatuses.deleted, value }]];

    const isSteady = secondJson[key] === value;

    if (isSteady) return [...acc, [key, { status: diffStatuses.steady, value }]];

    return [
      ...acc,
      [key, { status: diffStatuses.added, value }],
      [key, { status: diffStatuses.deleted, value: secondJson[key] }],
    ];
  }, []);

  const diff = Object.entries(secondJson).reduce((acc, [key, value]) => {
    const isDeleted = !firstJson[key];

    if (isDeleted) return [...acc, [key, { status: diffStatuses.deleted, value }]];

    return acc;
  }, diffByFirstJson);

  const sortedDiff = lodash.sortBy(diff, [([key]) => key]);

  const charsMap = {
    [diffStatuses.added]: '+',
    [diffStatuses.deleted]: '-',
  };

  const printedDiff = sortedDiff.reduce((acc, [key, line]) => {
    const char = charsMap[line.status] ?? ' ';

    return `${acc}  ${char} ${key}: ${line.value} \n`;
  }, '');

  return `{ \n${printedDiff}}`;
};
