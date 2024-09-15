// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract DecentralizedIdentity is ERC721, ERC721Burnable, Ownable {
    uint256 private _nextTokenId=1;
    constructor(address initialOwner)
        ERC721("Decentralized Identity", "DID")
        Ownable(initialOwner)
    {}
    struct DocumentInfo {
        string uid;
        string dob;
        string name;
    }
    mapping(address => uint256) public addressToID;
    mapping(address => DocumentInfo) public usertToDocument;

    function safeMint(address to , string memory _uid , string memory _dobtimestamp, string memory _name ) public onlyOwner {
        require(addressToID[to] == 0, "User already has a minted token");
        uint256 tokenId = _nextTokenId++;
        addressToID[to] = tokenId;
        usertToDocument[to] = DocumentInfo(_uid, _dobtimestamp, _name);
        _safeMint(to, tokenId);
    }

    function fetchDocument(address user) public onlyOwner view returns (DocumentInfo memory) {
        return usertToDocument[user];
    }

    // Override transferFrom to prevent transfers
    function transferFrom(address from, address to, uint256 tokenId) public pure override {
        revert("Soulbound: token is non-transferable");
    }

    // Override safeTransferFrom to prevent transfers
    function safeTransferFrom(address from, address to, uint256 tokenId) public pure override {
        revert("Soulbound: token is non-transferable");
    }

    // Override safeTransferFrom with data to prevent transfers
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public pure override {
        revert("Soulbound: token is non-transferable");
    }
}
