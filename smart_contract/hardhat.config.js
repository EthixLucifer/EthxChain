// https://eth-ropsten.alchemyapi.io/v2/1h_wkKfVo2skKqFaPLIkOZDD9-2IE7hI

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/1h_wkKfVo2skKqFaPLIkOZDD9-2IE7hI',
      accounts: ['47aee86744a5947ac0290f7918b4910a45c2028c285c2cd66087fbf265c1c92c']
    //   accounts: ['569ca17ffc0d0402dc44a8e0b54d1b88c23be8c1c5a2d583fde1c697c56bbb60']
    }
  }
}