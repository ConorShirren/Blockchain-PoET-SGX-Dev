const Transaction = require('./transaction');
const Wallet = require('./index');
const Blockchain = require('../blockchain');
const TransactionPool = require('./transaction-pool');


let transaction, wallet, recipient, amount;

wallet = new Wallet();
amount = 50;
recipient = 'recip_addresss';
blockchain1 = new Blockchain();
transactionPool1 =  new TransactionPool();
wallet.createTransaction(recipient,amount,blockchain1,transactionPool1);
wallet.createTransaction(recipient,30,blockchain1,transactionPool1);

transactionPool1.validTransactions();
// console.log(transaction);
// console.log(transaction.outputs.find(output => output.address === wallet.publicKey).amount);
// console.log(transactionPool1);
// console.log(transactionPool1.existingTransaction(wallet.publicKey));
