import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getJsonFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', 'json', filename);
const getYamlFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', 'yaml', filename);

describe('genDiff', () => {
  const expectedDiff = fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__', 'expected-stylish.txt'), 'utf-8');

  test('prints difference between two .json files', () => {
    const diff = genDiff(getJsonFixturePath('first.json'), getJsonFixturePath('second.json'));

    expect(diff).toBe(expectedDiff);
  });

  test('prints difference between two .yaml files', () => {
    const diff = genDiff(getYamlFixturePath('first.yaml'), getYamlFixturePath('second.yaml'));

    expect(diff).toBe(expectedDiff);
  });
});
