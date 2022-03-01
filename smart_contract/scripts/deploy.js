
const hre = require("hardhat");

const main = async () => {

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy(/*"Transaction Execeuted"*/);
  // passing paramaters when contract dosent takes any paramaters during deployment will throw too many arguments error

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

const runMain = async () => {

  try {
    await main();
    process.exit(0);
  }
  catch (error) {

    console.error(error);
    process.exit(1);

  }
}

runMain();
