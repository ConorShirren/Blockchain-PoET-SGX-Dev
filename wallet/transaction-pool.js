const Transaction = require('./transaction');

class TransactionPool {
    // Create an array of pending transactions to be stored before being mined into a block 
    // for the blockchain

    constructor(){
        this.transactions = [];
    }

    updateOrAddTransaction(transaction){
        // get the transaction while checking if it exists
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);

        if(transactionWithId){
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        }
        else{
            this.transactions.push(transaction);
        }
    }

    clearPool(){
        this.transactions = [];
        }

    existingTransaction(address){
        return this.transactions.find(t => t.input.address === address);
        }

    validTransactions(){

            return this.transactions.filter((transaction)=>{
                
                const outputTotal = transaction.outputs.reduce((accum,output)=>{ return accum + output.amount;},0)
                if( transaction.input.amount !== outputTotal ){
                    return;
                }
                if(!Transaction.verifyTransaction(transaction)){
                    return;
                }
                return transaction;
            })
        }
}

module.exports = TransactionPool;
