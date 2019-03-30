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

/**
 * Given a string, returns an array of chears that composed the string
 * @param {String} str - The string that will be converted
 * @returns {Array} - An array of the chars that composed the string
 */
const stringToLetterArray = str => str
  .toString()
  .split('');

/**
 * Given a string, returns a lowercased string and without the non-aplphanumeric characters
 * @param {String} str - The string that will be sanitized
 * @returns {String} - The lowercased string without non-alphanumeric characters
 */
const sanitize = str => str
  .toString()
  .replace(/[^a-zA-Z]/g, '')
  .toLowerCase();

/**
 * Given an array, returns a Map of the itens contaning the frequency of
 * the item inside the input array
 * @param {Array} array - The array of itens with its frequencies
 * @returns {Map} frequencies - A Map containing the frequencies of the items in the input array
 */
const itemFrequency = (array) => {
  const items = [].concat(array);

  const map = itemCounts(items);
  return items.reduce((frequencies, item) => frequencies
    .set(item, (map.get(item) / items.length)), new Map());
};

/**
 * Given a map with frequencies and total chart bar size, returns
 * the histogram
 * @param {Map} frequencies - The map of frequencies
 * @param {Number} totalChartSize - The total size of the chart bar on the console
 * @returns {String} - A string containing the entire histogram
 */
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
