import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  test('prints difference between two .json files', () => {
    const diff = genDiff(getFixturePath('first.json'), getFixturePath('second.json'));
    const expectedDiff = `{ 
  - follow: false 
    host: hexlet.io 
  - proxy: 123.234.53.22 
  + timeout: 50 
  - timeout: 20 
  - verbose: true 
}`;

    expect(diff).toBe(expectedDiff);
  });
});
