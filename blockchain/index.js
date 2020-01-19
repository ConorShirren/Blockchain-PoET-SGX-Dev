
const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];  // Create Blockchain with Genesis Block
      console.log("Update => Blockchain instance created using Genesis Block");
    }
// Add Block to Chain for PoW -> works correctly
   addBlockToChain(data) {
			const block = Block.mineBlock(this.chain[this.chain.length-1],data);
			this.chain.push(block);
			console.log("Update => Block Added to Chain");
        		return block;

	}

// Add Block ot Chain for PoET (getBlock & pushBlock)
	pushBlockToChain(data,currentChain) {
		this.getBlockForChain(data,function (block) {
			currentChain.push(block);
        		console.log("Update => Block Added to Chain");
			return block;
			});
	}

  	getBlockForChain(data, _callback) {
			Block.mineBlockPoET(this.chain[this.chain.length-1],data, function (block) {
			_callback(block);
                	});
	}

// Check if Chain is Valid
    isChainValid(chain){
        // Checks each current block's hash against the hash of the previous block
        for(let i = 1; i<chain.length;i++) {
            const block = chain[i];
            const previousBlock = chain[i-1];

            if(block.previousHash !== previousBlock.Hash) {
                console.log("Error => Chain Invalid (Previous hash does not match hash of previous block)");
                return false;
            } else if(block.Hash !== Block.blockHash(block)) {
                console.log("Error => Chain Invalid (Current hash does not match hash of current block)");
                return false;
                }
        }
        // Checks if first block == genesis block
        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) {
            console.log("Error => Genesis Block has been altered");
            return false;
        }
        return true;
    }

    // Used in p2p servers where a peer mines a block to the chain and then broadcasts the chain
    updateChain(recievedChain) {
        if(recievedChain.length <= this.chain.length) {
            console.log("Error => Chain recieved is not longer than current chain");
            return;
        } else if(!this.isChainValid(recievedChain)) {
            console.log("Error => Chain Recieved is invalid");
            return;
        }
        console.log("[Replacing this chain with new recieved Chain]");
        this.chain = recievedChain; //Update Chain
    }

    toString() {
        return this.chain;
    }
}

module.exports = Blockchain;
