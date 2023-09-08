// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;
// import "hardhat/console.sol";

contract Lottery{
    address public manager;
    address[] public players;

    constructor(){
    //   console.log("Contract owner :",msg.sender);
      manager = msg.sender;
    }

    function enterLottery () public payable{
      require(msg.value> 0.01 ether, "Entered amount is less than 0.01 ether.");
      
      players.push(msg.sender);
    }

    function playersList() public view returns(address[] memory){
       return players;
    } 

    function random() private view returns(uint) {
       bytes32 hash = keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp, players));
       return uint(hash);
    }

    function pickWinner() public onlyManagerCanCallWinner{        
      uint index = random() % players.length;
      address winner = players[index];
      uint lotteryAmount = address(this).balance;

      payable(winner).transfer(lotteryAmount);
    //   console.log("And the winner is :",winner, "who won WEI of :",lotteryAmount);

      players = new address[](0);
    }

    // Modifiers allows us to DRY the code
    modifier onlyManagerCanCallWinner(){
      require(players.length > 0, "No players in the lottery.");
      require(msg.sender == manager);
      _;
    }
}