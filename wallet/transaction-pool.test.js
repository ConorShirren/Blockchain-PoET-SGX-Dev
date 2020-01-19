const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');

describe('Transaction Pool',()=>{

    let transactionPool, wallet, transaction, recipient, amount;

    beforeEach(()=>{
        recipient = 'recip_addresss';
        amount = 50;
        wallet = new Wallet();
        blockchain1 = new Blockchain();
        transactionPool1 = new TransactionPool();
        transaction = wallet.createTransaction(recipient,amount,blockchain1,transactionPool1);

    });

    it('Checks if transaction is added to the transaction pool correctly',()=>{
        expect(transactionPool1.transactions.find(transact => transact.id === transaction.id)).toEqual(transaction);
    });

    it('Checks is clear transactionPool method works correctly',() => {
        transactionPool1.clearPool();
        expect(transactionPool1.transactions).toEqual([]); //transactionPool array is empty
    });

    it('Check the functionality of existingTransaction method',()=>{
        expect([transactionPool1.existingTransaction(wallet.publicKey)]).toEqual(transactionPool1.transactions);
    });

});

