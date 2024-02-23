
const hrdhat = require("hardhat");

async function startFunction() {
  const home = await hrdhat.ethers.getContractFactory("VotingSystem");
  const Voting = await home.deploy();
  await Voting.deployed();

}


startFunction().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
