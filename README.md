# Secure Single-Click Identity Verification using zk-SNARKs and MPC
## Introduction
This project demonstrates a secure single-click identity verification system using zk-SNARKs and MPC. The system utilizes JavaScript, Solidity, and Circom to provide a seamless and private identity verification experience.

# Components
Circom: A circuit compiler that generates zk-SNARKs proofs.
Solidity: A programming language for writing smart contracts on the Ethereum blockchain.
JavaScript: A programming language for client-side interactions and proof generation.
### Problem Statement
The traditional way of using KYC takes 1-2 days for verification and is centralized, raising privacy concerns due to data duplication and potential identity theft.

![WhatsApp Image 2024-09-15 at 12 53 45_b628175a](https://github.com/user-attachments/assets/4421142b-3050-4ce2-984e-a607cbfd4846)
![WhatsApp Image 2024-09-15 at 12 55 31_391eb855](https://github.com/user-attachments/assets/c7683dcd-f1f0-4445-b11f-d837be595521)
![WhatsApp Image 2024-09-15 at 12 56 22_448332ca](https://github.com/user-attachments/assets/fc2a65d0-8378-4d96-9c6e-dfb88328fb7b)
![image](https://github.com/user-attachments/assets/6b9c36b2-7102-4e1c-92b5-87afbe1f564f)


## Use of SBT
We use SBT (Soul-Bound Tokens) for identity issuance. SBTs are non-transferable NFTs that represent an individual's identity, ensuring it cannot be stolen or lost.

## Use of ZKP
For identity verification, we utilize zk-proofs, which enable the verification of data without revealing the actual data. This ensures that the organizer can verify the identity without accessing the underlying data, thereby maintaining privacy.

## Use of MPC
We introduce Multi-Party Computation (MPC) as a second layer for KYC verification. MPC allows for the sharing of data with multiple parties without revealing the actual data. In our project, MPC is used to request acknowledgments from multiple parties about a user's relevant data, such as insurance policies.

![WhatsApp Image 2024-09-15 at 12 58 10_95f68123](https://github.com/user-attachments/assets/1a92dfb6-a287-450a-8536-d4f1dbd3fe1c)
![WhatsApp Image 2024-09-15 at 12 58 37_717cb0fb](https://github.com/user-attachments/assets/f8600379-4001-436a-b4b2-8a50062357ef)
![WhatsApp Image 2024-09-15 at 13 01 12_27a7a215](https://github.com/user-attachments/assets/69201dee-b7cd-4eb8-8a10-8f009e4045f5)


For example, if a user has insurance policies with BOB, SBI, and ICICI, and purchases another policy from HDFC, during KYC verification, the system checks the user's age and existence. Additionally, it obtains acknowledgments from the parties involved to prevent fake insurance claims and fraud.

This concept can be applied to other domains as well.

## Tech Stack
We utilize the smart rollup of Tezos and Etherlink Chain, which offers:

- Low block confirmation times
- L2 Blockchain
- This tech stack enables fast and secure identity verification while maintaining user privacy.
