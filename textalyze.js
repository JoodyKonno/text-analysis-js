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
  
  let args = "aabbccd";
  console.log(`The letter count for ${args} is: `);
  console.log(itemCounts(stringToLetterArray(args)));

  console.log('--------------------------');

  args = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque blandit turpis, eu pellentesque dui convallis vitae. Maecenas elit sem, fermentum non pellentesque eu, lacinia eget dui. Fusce accumsan, ex eget facilisis bibendum, est tortor congue tortor, varius aliquam ex magna et metus. Praesent suscipit diam eu diam tincidunt egestas. Quisque maximus purus posuere nisi dapibus, eu ornare diam fermentum. Vestibulum bibendum, mauris condimentum feugiat consectetur, nisl nunc aliquet urna, vel auctor magna diam sed mauris. Morbi faucibus, ex in hendrerit egestas, nulla purus gravida tortor, ac bibendum ligula dolor vel diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris facilisis, dolor posuere mattis ultrices, felis nibh pulvinar metus, at fringilla dolor ante eu augue. Ut auctor lacus ac odio venenatis pretium. Fusce eleifend lorem eu tincidunt pulvinar. Donec eu tellus et justo pharetra bibendum ut id libero. Fusce luctus velit ultricies ante iaculis fringilla.";
  console.log(`The letter count for ${args.slice(0, 40)} is: `);
  console.log(itemCounts(stringToLetterArray(args)));

  console.log('--------------------------');

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
