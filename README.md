# Voting System Contract

## Overview

The Voting System contract is a smart contract written in Solidity that enables users to participate in voting for different parties. It provides functionalities for voter registration, voting, and retrieving vote counts for each party.

## Features

- **Voter Registration**: Admin can register new voters by providing their address and age.

- **Voting**: Registered voters can cast their votes for their preferred party using the `vote` function.

- **Vote Count Retrieval**: Users can retrieve the vote count for each party using the `getVoteCount` function.

## Prerequisites

- Solidity ^0.8.9

## Contract Details

### Constructor

The constructor initializes the contract and sets the deployer address as the owner.

### Functions

- **registerNewVoter**: Allows the owner to register new voters by providing their address and age.

- **vote**: Allows registered voters to cast their votes for their preferred party.

- **getVoteCount**: Retrieves the vote count for a specific party.

- **getContractAddress**: Returns the address of the contract.

## Usage

1. Deploy the `VotingMachine` contract to your preferred Ethereum network.

2. Use the provided functions to register new voters, cast votes, and retrieve vote counts.

## License

This contract is provided under an unlicensed status. See the [UNLICENSE](UNLICENSE) file for details.

## Project Setup Instructions

To run this project on your computer after deploying the contract, follow the steps below:

1. **Install Dependencies:**
   - Navigate to the project directory in the terminal.
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```

2. npm hardhat node 
3. npx hardhat run --network localhost scripts/deploy.js
4. **Start Front-end Application:**
   - Run the front-end application to interact with the deployed contract:
     ```bash
     npm run dev
     ```

3. **Access the Project:**
   - The project will be accessible on your local machine, typically at [http://localhost:3000/](http://localhost:3000/).

Now, the project is successfully running on your localhost. Ensure to follow these steps in sequence for a smooth setup process.