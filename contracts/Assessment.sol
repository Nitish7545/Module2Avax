// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract VotingSystem {
    mapping(address => uint256) voteMapper;
    mapping(address => bool) hasVoted;
    mapping(address => bool) voterRegister;
    mapping(uint256 => uint256) partyVotes; 
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function RegisterNewVoter(address voterAddress, uint256 age) public onlyOwner {
        require(age >= 18, "Voter must be at least 18 years old");
        require(!voterRegister[voterAddress], "Voter already registered");
        voterRegister[voterAddress] = true;
    }

    function vote(address voterAddress, uint256 partyCode) public onlyOwner {
        require(partyCode <= 9999, "Only party code from 0 to 9999 are allowed");
        require(voterRegister[voterAddress], "Voter should be registered first");
        require(!hasVoted[voterAddress], "Voter can only vote once");

        hasVoted[voterAddress] = true;
        voteMapper[voterAddress] = partyCode;
        partyVotes[partyCode]++; 
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    function getVoteCount(uint256 partyCode) public view returns (uint256) {
        require(partyCode <= 9999, "Only party code from 0 to 9999 are allowed");
        return partyVotes[partyCode];
    }
}
