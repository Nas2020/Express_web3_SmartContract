
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  const Web3 = require('web3');
  var Tx = require('ethereumjs-tx').Transaction;
   const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
   var accounts = await web3.eth.getAccounts();
  console.log("Accounts:", accounts);
  const contractAddress = '0xfd81d39A86cb82560009E52676a4e0F1B5dd24cf';
  const ABI = require('./test.abi.json');
  const account = '0x5475b8227DE01A572453fe48924d56e9b9553373';
  const privateKey = Buffer.from('4ffd2238f025f749a40db18ffba486fb4e3ee6845ea645f31c8643c43f9e5318','hex');
  const newData = 10;
  var TestContract = new web3.eth.Contract(ABI, contractAddress);
  const _data = TestContract.methods.setData(newData).encodeABI();
   _nonce = await web3.eth.getTransactionCount(account);
   var rawTx = {
    nonce: _nonce,
    gasPrice: '0x20000000000',
    gasLimit: '0x41446',
    to: contractAddress,
    value: 0,
    data: _data
   }
   var tx = new Tx(rawTx);
   tx.sign(privateKey);
   var serializedTx = tx.serialize();
   var _receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
   console.log("Receipt: ", _receipt);
   



   res.render('index', { title: 'Express', receipt: JSON.stringify(_receipt) });

});

module.exports = router;
