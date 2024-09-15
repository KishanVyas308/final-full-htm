// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

contract ReportIdentity is ERC721, ERC721Burnable, Ownable {
    uint256 private _nextTokenId=1;
    constructor(address initialOwner)
        ERC721("Report Identity", "RID")
        Ownable(initialOwner)
    {}
    struct ReportInfo {
        string Subject;
        string description;
        string company;
    }
    mapping(address => uint256[]) public addressToIDs;
    mapping(address => ReportInfo[]) public tokenToReport;

    function negativeMint(address to , string memory _Subject , string memory _description, string memory _company ) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        tokenToReport[to].push(ReportInfo(_Subject, _description, _company));
        _safeMint(to, tokenId);
    }

    function fetchDocuments(address user) public view onlyOwner returns (ReportInfo[] memory) {
        return tokenToReport[user];
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
