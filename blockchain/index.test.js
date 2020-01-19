const Blockchain = require('./index');
const Block = require('./block');

describe("Blockchain",()=>{
    let blockchain,blockchain2;

    beforeEach(()=>{
        blockchain = new Blockchain();
        longerChain = new Blockchain(); // Only Relevant for last Test updateChain
    });

    it('Checks if Blockchain begins with Genesis',()=>{
        expect(Block.genesis()).toEqual(blockchain.chain[0]);
    });

    it('Checks addBlockToChain Functionality',()=>{
        const data = "example_data";
        blockchain.addBlockToChain(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });

    it('Check isChainValid Functionality -> Valid',()=>{
        blockchain.addBlockToChain('example_data');
        expect(blockchain.isChainValid(blockchain.chain)).toBeTruthy();
    });

    it('Check isChainValid Functionality -> Invalid',()=>{
        blockchain.addBlockToChain('example_data');
        blockchain.chain[blockchain.chain.length-1].data = 'virus';
        expect(blockchain.isChainValid(blockchain.chain)).toBe(false);
    });

    it('Check isChainValid Functionality -> Invalid',()=>{
        blockchain.chain[0].data = 'not_genesis';
        expect(blockchain.isChainValid(blockchain.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain',()=>{
        longerChain.addBlockToChain('example_data');
        blockchain.updateChain(longerChain.chain);
        expect(blockchain.chain).toEqual(longerChain.chain);
    });
    
   it('PoET - Checks pushBlockToChain Functionality',()=>{
        const data = "example_data";
        blockchain.pushBlockToChain(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });

    it('PoET - Check isChainValid Functionality -> Valid',()=>{
        blockchain.pushBlockToChain('example_data');
        expect(blockchain.isChainValid(blockchain.chain)).toBeTruthy();
    });

    it('PoET - Check isChainValid Functionality -> Invalid',()=>{
        blockchain.pushBlockToChain('example_data');
        blockchain.chain[blockchain.chain.length-1].data = 'virus';
        expect(blockchain.isChainValid(blockchain.chain)).toBe(false);
    });

    it('PoET - replaces the chain with a valid chain',()=>{
        longerChain.pushBlockToChain('example_data');
        blockchain.updateChain(longerChain.chain);
        expect(blockchain.chain).toEqual(longerChain.chain);
    });
});

