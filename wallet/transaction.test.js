const Transaction = require('./transaction');
const Wallet = require('./index');
const {MINING_REWARD} = require('../config');


describe('Transaction',()=>{

    let transaction, wallet, recipient, amount;


    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'recip_addresss';
        transaction = Transaction.createTransaction(wallet,recipient,amount);
    });


    it('Checks Input script is formed correctly', ()=>{
        expect(transaction.input.amount).toEqual(wallet.balance);
        expect(transaction.input.address).toEqual(wallet.publicKey);
    });

    it('Checks if output script showing remaining balance is equal to balance-amount before transaction', ()=>{
        expect(transaction.outputs.find(output=> output.address === wallet.publicKey).amount).toEqual(wallet.balance-amount);
    });

    it('Check is recipient address equals actual recipient address declared', ()=>{
        expect(transaction.outputs.find(output=> output.address === recipient).address).toEqual(recipient);
    });

    it('Check is Output showing the amount equals the Amount', ()=>{
        expect(transaction.outputs.find(output=> output.address === recipient).amount).toEqual(amount);
    });

    it('Alter a transaction and verify using the verifyTransaction method', ()=>{
        transaction.outputs.find(output=> output.address === wallet.publicKey).amount = 1000;
        expect(Transaction.verifyTransaction(transaction)).toEqual(false);
    });

});


