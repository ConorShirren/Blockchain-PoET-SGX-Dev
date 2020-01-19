const blockchain = require('./index.js');
const Block = require('./block');
function function1() {
    // stuff you want to happen right away
    console.log(blockchain1.toString());
}

blockchain1 = new blockchain();
console.log("Blockchain - \n", blockchain1.toString());
let data = 'foo';
blockchain1.addBlockToChain(data);
//blockchain1.pushBlockToChain(data,blockchain1.chain);
setTimeout(function1,10000);
