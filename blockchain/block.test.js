const Block = require('./block');

describe("Block",()=>{

    let data,lastBlock,block;

    beforeEach(()=>{
         data = 'example_data';
         lastBlock = Block.genesis();
         block = Block.mineBlock(lastBlock,data);
    });

    it("Checks the Input data is accessible from the block",()=>{
        expect(block.data).toEqual(data);
    });

    it("Checks the previousHash is equal to the hash of the lastBlock",()=>{
        expect(block.previousHash).toEqual(lastBlock.hash);
    });

    it('Checks if PoW algorithm is working',()=>{
        expect(block.Hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    beforeEach(()=>{
         data1 = 'example_data';
         lastBlock = Block.genesis();
         block1 = Block.mineBlockPoET(lastBlock,data);
    });

    it("Checks the Input data is accessible from the block",()=>{
        expect(block1.data).toEqual(data);
    });

    it("Checks the previousHash is equal to the hash of the lastBlock",()=>{
        expect(block1.previousHash).toEqual(lastBlock.hash);
    });
})


