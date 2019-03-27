/**
 * This is the base code for v0.1 of our JavaScript text analyzer.
 * Visit https://github.com/jfarmer/text-analysis to see what to do.
 *
 * Send a message in Slack if you're stuck or unsure what to do.  These
 * comments are here to help you, but please delete them as you go along.
 */

/**
 * Given an input Array, returns a Map containing the count of each item in the input.
 * @param {Array} array - The array of items to count
 * @param {Map} counts - A Map containing the counts of the items in the input array
 */
const itemCounts = array => array.reduce((counts, item) => !counts.has(item)
  ? counts.set(item, 1)
  : counts.set(item, counts.get(item) + 1)
  , new Map());

const stringToLetterArray = str => typeof str == 'string' 
  ? str.split('')
  : [];

const sanitize = str => typeof str == 'string' 
  ? str.toLowerCase()
  : '';

if (require.main === module) {
  
  const fs = require('fs');

  console.log('Reading file sample_data/moby_dick.txt');
  fs.readFile('./sample_data/moby-dick.txt', (err, data) => {
    if (err) {
      console.log('Error reading file');
      throw err;
    }

    const contents = new Buffer.from(data).toString();

    console.log(`File contents: ${contents.slice(0, 40)}...`);
    console.log(`The letter count is: `);
    console.log(itemCounts(stringToLetterArray(contents)));
  });
 
}

module.exports = { itemCounts, stringToLetterArray, sanitize };
