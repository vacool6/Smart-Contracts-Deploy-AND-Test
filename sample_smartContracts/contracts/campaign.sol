// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum,msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns( address[] memory){
      return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

   Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public contributors;
    uint256 public contributorsCount;

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }
    
    constructor(uint256 minimum,address creator){
         manager = payable(creator);
         minimumContribution = minimum;
     }

   function contribute() public payable {
        require(msg.value > minimumContribution, "Contribution amount is less than the minimum required");
        contributors[msg.sender] = true;
        contributorsCount++;
    }

    function createRequest(string memory description, uint256 value, address payable recipient) public restricted {
          Request storage newRequest = requests.push();
          newRequest.description = description;
          newRequest.value = value;
          newRequest.recipient = recipient;
          newRequest.complete = false;
          newRequest.approvalCount = 0;   
    }

    function approveRequest(uint256 index) public {
        // Non-contributors cannot approve
        require(contributors[msg.sender], "Only contributors can approve requests");
        // Contributors can only vote once
        require(!requests[index].approvals[msg.sender], "You have already voted for this request");

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];
        // More than 50% of votes
        require(request.approvalCount > (contributorsCount / 2), "Not enough approvals for the request");
        require(!request.complete, "Request has already been completed");

        // Transfer amount to the vendor
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}











