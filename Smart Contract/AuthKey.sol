// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract AuthKeyRegistry is Ownable{

    constructor()
        Ownable(msg.sender)
    {}

    mapping(address => bytes32) private authKeyMapping;

    event AuthKeyAssigned(address indexed wallet, bytes32 authKey);

    function generateAuthKey(address to) internal onlyOwner view returns (bytes32) {
        return keccak256(abi.encodePacked(block.timestamp, to, block.difficulty));
    }

    function authUser(address to) public onlyOwner{
        require(authKeyMapping[to] == bytes32(0), "Auth key already assigned");

        bytes32 newAuthKey = generateAuthKey(to);

        authKeyMapping[to] = newAuthKey;

        emit AuthKeyAssigned(to, newAuthKey);
    }

    function getAuthKey(address to) public onlyOwner view returns (bytes32) {
        bytes32 authKey = authKeyMapping[to];
        require(authKey != bytes32(0), "No auth key assigned to this address");
        return authKey;
    }
}