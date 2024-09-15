// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public owner;
    bool public votingActive;
    mapping(address => bool) public authorizedUsers;
    mapping(address => bool) public hasVoted;

    uint256 public yesVotes;
    uint256 public noVotes;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "You are not authorized to vote");
        _;
    }

    modifier votingIsActive() {
        require(votingActive, "Voting is not active");
        _;
    }

    event VotingStarted();
    event VotingEnded(uint256 yesVotes, uint256 noVotes);
    event UserVoted(address user, bool vote);

    constructor() {
        owner = msg.sender;
        votingActive = false;
    }

    // Function to authorize users for voting
    function authorizeUser(address _user) external onlyOwner {
        authorizedUsers[_user] = true;
    }

    // Function to start voting
    function startVoting() external onlyOwner {
        require(!votingActive, "A voting poll is already active");
        votingActive = true;

        // Reset votes from the previous poll
        yesVotes = 0;
        noVotes = 0;

        emit VotingStarted();
    }

    // Function to end voting
    function endVoting() external onlyOwner votingIsActive {
        votingActive = false;
        emit VotingEnded(yesVotes, noVotes);
    }

    // Function to cast a vote
    function vote(bool _vote) external onlyAuthorized votingIsActive {
        require(!hasVoted[msg.sender], "You have already voted");

        if (_vote) {
            yesVotes += 1;
        } else {
            noVotes += 1;
        }

        hasVoted[msg.sender] = true;
        emit UserVoted(msg.sender, _vote);
    }

    // Function to get the current number of Yes and No votes
    function getVoteCounts() external view returns (uint256 _yesVotes, uint256 _noVotes) {
        return (yesVotes, noVotes);
    }
}
