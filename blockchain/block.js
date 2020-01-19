 

const SHA256 = require('crypto-js/sha256');



const { DIFFICULTY } = require('../config.js');

class Block {
    constructor(timestamp, previousHash, Hash, data, nonce, DIFFICULTY) {
        this.difficulty = DIFFICULTY;       // PoW Difficulty
        this.timestamp = timestamp;         // Timestamp Associated with the block
        this.previousHash = previousHash;   // Hash of previous block, creating the link
        this.Hash = Hash;                   // Current hash using SHA256
        this.data = data;                   // Data i.e Transactions in the block
        this.nonce = nonce;                 // Nonce (relavant for PoW)
    }

    toString() {    // Prints the contents of the block to the console
        return `Block contents =>
        Difficulty  : ${this.difficulty}
        TimeStamp   : ${this.timestamp}
        previousHash: ${this.previousHash}
        Hash        : ${this.hash}
        Data        : ${this.data}
        Nonce       : ${this.nonce}`;
    }

    static genesis() {
        return new this('T-Genesis',undefined,undefined,[],0,0); // Creates the Genesis Block
    }

    static hash(timestamp,previousHash,data,nonce,difficulty){  // Creates hash of contents passed to the block 
        return SHA256(`${timestamp}${previousHash}${data}${nonce}${difficulty}`).toString();
    }

    static mineBlock(previousBlock,data){


        // Define Variables
        let hash;
        let timestamp;
        const previousHash = previousBlock.hash;
        let nonce = 0;
        let { difficulty } = previousBlock;
        // generate the hash of the block

        do {
            nonce++;
            timestamp = Date.now();
             difficulty = 4;
            hash = Block.hash(timestamp,previousHash,data,nonce,difficulty);
            // checking if we have the required no of leading number of zeros
        } while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp,previousHash,hash,data,nonce,difficulty);
    }

    static blockHash(block) {
        // returns the hash of a given block based on its contents
        const {timestamp,previousHash,data,nonce,difficulty} = block;
        return Block.hash(timestamp,previousHash,data,nonce,difficulty);
    }

    static mineBlockPoET(previousBlock,data,_callback){

    var exec = require("child_process").exec;
    exec("cd ~/Documents/Project/poet_sgx_blockchain/enclave && make", function (err, stdout) {
            if (err) {
                     throw err;
            }
    })
    exec("cd ~/Documents/Project/poet_sgx_blockchain/enclave && ./app", function (err, atest) {
            if (err) {
                     throw err;
            }  else if(atest === 'poet') {
            // Define Variables for Block
            let hash;
            let timestamp = Date.now();
            const previousHash = previousBlock.hash;
            let nonce = 0;
            let difficulty = 0;
            hash = Block.hash(timestamp,previousHash,data,nonce,difficulty);
	    let bl = new Block(timestamp,previousHash,hash,data,nonce,difficulty);
//	    console.log(bl);;
	    _callback(bl);
        } else { console.log("PoET didnt print"); }		
            }
    )
	
    }

}
module.exports = Block;
