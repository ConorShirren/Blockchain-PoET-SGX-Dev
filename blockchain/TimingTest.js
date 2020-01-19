const blockchain = require('./index.js');
const Block = require('./block');

var d = new Date();

function function1(_callback) {
    blockchain1 = new blockchain();
    let data = 'foo';
    blockchain1.addBlockToChain(data);
    console.log(blockchain1.toString());
    _callback();
}

function function2(_callback) {
    blockchain1 = new blockchain();
    let data = 'foo';
    blockchain1.pushBlockToChain(data,blockchain1.chain, function (data) {
	_callback();
	});
    //console.log(blockchain1.toString());
    //_callback();
}

function getNanoSecTime() {
    var hrTime = process.hrtime();
    return hrTime[0] * 1000000000 + hrTime[1];
  }

console.log("Function Starting");
var startTime = getNanoSecTime()//d.getTime();
function2( function (data) {
    var endTime = getNanoSecTime()//d.getTime();
    console.log("Function Finished");
    funcTime = endTime - startTime;
    console.log("---------------");
    console.log("Start Time - ", startTime);
    console.log("End Time - ", endTime);
    console.log("\nTime for function (nano) - ", funcTime);
    console.log("\nTime for function (milli) - ", funcTime/1000000);
    console.log("\n");
});
