
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

const mnemonic_test = process.env.MNEMONIC_TEST
const mnemonic = process.env.MNEMONIC

module.exports = {
  networks: {
    ftm_testnet: {
      //  https://rpcapi.fantom.network for mainnet
      provider: () => new HDWalletProvider(mnemonic_test,'https://rpc.testnet.fantom.network/'),
      network_id: 4002, // as seen in error message
      confirmations: 5,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    ftm_mainnet: {
      provider: () => new HDWalletProvider(mnemonic,'https://rpc.ftm.tools'),
      network_id: 250, // as seen in error message
      confirmations: 3,
      timeoutBlocks: 10000,
      skipDryRun: true,
      networkCheckTimeout: 999999, // for handling timeouts
      // gas: 2000000,
      // gasPrice: 50000000000,
    },
    velas_mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://evmexplorer.velas.com/rpc`),
      network_id: 106,
      confirmations: 2,
      timeoutBlocks: 10000, // was 500 before
      skipDryRun: true,
      gas: 20000000,
      gasPrice: 50000000000, // 1 eth is the max
    },

    velas_testnet: {
      provider: () => new HDWalletProvider(mnemonic_test, `wss://api.velas.com/`),
      network_id: 111,
      confirmations: 2,
      timeoutBlocks: 10000, // was 500 before
      skipDryRun: true,
      gas: 20000000,
      gasPrice: 50000000000, // 1 eth is the max
    },

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
