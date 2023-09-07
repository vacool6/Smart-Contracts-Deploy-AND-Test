// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract Inbox{

    // Storage variable

    string public message;

    // Constructor function for initial value
    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
       message = newMessage;
    }

    // When ever we define a storage variable "message" in this case with public keyword
    // Solidity automatically create a function with same name as storage variable "message".

    //  function getMessage() public view returns (string) {
    //     return message;
    //  }
   
    // ^ This is a duplicate function ^

}