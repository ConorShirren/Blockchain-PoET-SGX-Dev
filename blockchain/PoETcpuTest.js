const blockchain = require('./index.js');
const Block = require('./block');

blockchain1 = new blockchain();
console.log("Blockchain - \n", blockchain1.toString());
let data = 'foo';
blockchain1.pushBlockToChain(data,blockchain1.chain, function (data) {
console.log(blockchain1.toString());
});
