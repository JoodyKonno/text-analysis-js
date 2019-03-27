const { itemCounts, stringToLetterArray, sanitize, itemFrequency } = require('../textalyze');

describe('itemCount', () => {
  test('returns a count of the strings in the array', () => {
    const input = ['one', 'two', 'three', 'one', 'two', 'ZZZZ'];
    const expectedOutput = new Map([['one', 2], ['two', 2], ['three', 1], ['ZZZZ', 1]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('returns an empty hash when array is empty', () => {
    const input = [];
    const expectedOutput = new Map();

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('counts multiple words', () => {
    const input = ['hi', 'hi', 'hi'];
    const expectedOutput = new Map([['hi', 3]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('handles non-string inputs', () => {
    const input = ['null', null, '10', 10];
    const expectedOutput = new Map([['null', 1], [null, 1], ['10', 1], [10, 1]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });

  test('is case-sensitive', () => {
    const input = ['a', 'A', 'a', 'A'];
    const expectedOutput = new Map([['a', 2], ['A', 2]]);

    expect(itemCounts(input)).toEqual(expectedOutput);
  });
});

describe('stringToLetterArray', () => {
  test('return a letter array from the input string', () => {
    const input = 'aaabcc a.';
    const expectedOutput = ['a', 'a', 'a', 'b', 'c', 'c', ' ', 'a', '.'];

    expect(stringToLetterArray(input)).toEqual(expectedOutput);
  });

  test('handles non-string inputs', () => {
    const input = 10;
    const expectedOutput = [];

    expect(stringToLetterArray(input)).toEqual(expectedOutput);
  });
});

describe('sanitize', () => {
  test('return the lowercase version of given string', () => {
    const input = 'aaAbCc.a';
    const expectedOutput = 'aaabcc.a';

    expect(sanitize(input)).toEqual(expectedOutput);
  });

  test('handles non-string inputs', () => {
    const input = 10;
    const expectedOutput = '';

    expect(sanitize(input)).toEqual(expectedOutput);
  });
});

describe('itemFrequency', () => {
  test('return a new Map with frequency', () => {
    const input = ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c', 'c', 'c'];
    const expectedOutput = new Map([['a', '0.27'], ['b', '0.27'], ['c', '0.45']]);

    expect(itemFrequency(input)).toEqual(expectedOutput);
  });

  test('handles non-array inputs', () => {
    const input = 'hello';
    const expectedOutput = new Map();

    expect(itemFrequency(input)).toEqual(expectedOutput);
  });

  test('return empty map when it receives an empty array input', () => {
    const input = [];
    const expectedOutput = new Map();

    expect(itemFrequency(input)).toEqual(expectedOutput);
  });
});
