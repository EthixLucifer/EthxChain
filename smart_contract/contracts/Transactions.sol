//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
//transactionContract
contract Transactions {
    uint transactionCount;

    event Transfer(address From, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct{
        
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;

    }

    TransferStruct[] transactions;

    function  addToBlockchain (address payable receiver, uint amount, string memory message, string memory keyword) public  {

    transactionCount+=1;
    
    transactions.push(TransferStruct(msg.sender, receiver , amount, message, block.timestamp, keyword ));
    
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);

    }

    function  getAllTransactions() public view returns(TransferStruct[] memory) {
    
        return transactions;
    }

    function  getTransaction () public view returns(uint256)  {
        return transactionCount;
    }
}