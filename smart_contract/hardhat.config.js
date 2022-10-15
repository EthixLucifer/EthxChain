// https://eth-ropsten.alchemyapi.io/v2/1h_wkKfVo2skKqFaPLIkOZDD9-2IE7hI

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/1h_wkKfVo2skKqFaPLIkOZDD9-2IE7hI',
      accounts: ['account private key']
    //   accounts: ['account private key']
    }
  }
}
