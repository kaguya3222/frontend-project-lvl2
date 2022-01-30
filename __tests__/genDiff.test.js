import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getJsonFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', 'json', filename);
const getYamlFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', 'yaml', filename);

describe('genDiff', () => {
  const expectedDiff = `{ 
  - follow: false 
    host: hexlet.io 
  - proxy: 123.234.53.22 
  - timeout: 50 
  + timeout: 20 
  + verbose: true 
}`;

  test('prints difference between two .json files', () => {
    const diff = genDiff(getJsonFixturePath('first.json'), getJsonFixturePath('second.json'));

    expect(diff).toBe(expectedDiff);
  });

  test('prints difference between two .yaml files', () => {
    const diff = genDiff(getYamlFixturePath('first.yaml'), getYamlFixturePath('second.yaml'));

    expect(diff).toBe(expectedDiff);
  });
});
