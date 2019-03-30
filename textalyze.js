const fs = require('fs');
const path = require('path');

/**
 * Given an input Array, returns a Map containing the count of each item in the input.
 * @param {Array} array - The array of items to count
 * @param {Map} counts - A Map containing the counts of the items in the input array
 */
const itemCounts = array => array.reduce((counts, item) => (!counts.has(item)
  ? counts.set(item, 1)
  : counts.set(item, counts.get(item) + 1)), new Map());

const stringToLetterArray = str => str
  .toString()
  .split('');

const sanitize = str => str
  .toString()
  .replace(/[^a-zA-Z]/g, '')
  .toLowerCase();

const itemFrequency = (array) => {
  if (typeof array !== 'object' && !array.isArray) {
    return new Map();
  }

  const map = itemCounts(array);
  return array.reduce((frequencies, item) => frequencies
    .set(item, (map.get(item) / array.length)), new Map());
};

const getHistogram = (frequencies, totalChartSize) => {
  const result = [];

  frequencies.forEach((frequency, letter) => {
    const bar = '=';

    const itemBars = (frequency * 100) / (100 / totalChartSize);
    const chartBar = Array(totalChartSize)
      .fill(bar, 0, itemBars)
      .join('');
    const itemBarSpace = (frequency >= 0.1) ? '' : ' ';

    result.push(`${letter} [${itemBarSpace}${(frequency * 100).toFixed(2)}%] ${chartBar}>`);
  });

  return result.join('\n');
};

const main = () => {
  const args = process.argv.slice(2);

  args.forEach((arg) => {
    fs.readFile(path.resolve(arg), 'utf8', (err, contents) => {
      if (err) {
        console.log('Error reading file: ');
        throw err;
      }

      console.log(`File contents: ${contents.slice(0, 40)}...`);

      const itemFrequencies = itemFrequency(stringToLetterArray(sanitize(contents)));

      console.log(getHistogram(itemFrequencies, 200));
    });
  });
};

if (require.main === module) {
  main();
}

module.exports = {
  itemCounts,
  itemFrequency,
  stringToLetterArray,
  sanitize,
  getHistogram,
};
