import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import { parseJson, parseYaml } from './parsers/index.js';

const diffStatuses = {
  deleted: 'deleted',
  steady: 'steady',
  added: 'added',
};

const yamlFileExtensions = ['.yaml', '.yml'];

const getParser = (fileExtension) => {
  if (yamlFileExtensions.includes(fileExtension)) return parseYaml;

  return parseJson;
};

export default (firstFilePath, secondFilePath) => {
  const resolvedFirstFilePath = path.resolve(firstFilePath);
  const resolvedSecondFilePath = path.resolve(secondFilePath);

  const firstFile = fs.readFileSync(resolvedFirstFilePath);
  const secondFile = fs.readFileSync(resolvedSecondFilePath);

  const parser = getParser(path.extname(firstFilePath));

  const firstJson = parser(firstFile);
  const secondJson = parser(secondFile);

  const diffByFirstJson = Object.entries(firstJson).reduce((acc, [key, value]) => {
    const isDeleted = !secondJson[key];

    if (isDeleted) return [...acc, [key, { status: diffStatuses.deleted, value }]];

    const isSteady = secondJson[key] === value;

    if (isSteady) return [...acc, [key, { status: diffStatuses.steady, value }]];

    return [
      ...acc,
      [key, { status: diffStatuses.deleted, value }],
      [key, { status: diffStatuses.added, value: secondJson[key] }],
    ];
  }, []);

  const diff = Object.entries(secondJson).reduce((acc, [key, value]) => {
    const isAdded = !firstJson[key];

    if (isAdded) return [...acc, [key, { status: diffStatuses.added, value }]];

    return acc;
  }, diffByFirstJson);

  const sortedDiff = _.sortBy(diff, [([key]) => key]);

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
