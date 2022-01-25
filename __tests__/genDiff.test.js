import genDiff from '../src/genDiff.js';

describe('genDiff', () => {
  test('prints difference between two .json files', () => {
    const diff = genDiff('__fixtures__/first.json', '__fixtures__/second.json'); // TODO: generate absolute path using resolve
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
