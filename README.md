# bitcoinjs-message-signing

Browser-based BTC, LTC, and DOGE cryptocurrency message signing, using [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) and [bitcoinjs-message](https://github.com/bitcoinjs/bitcoinjs-message).

---

🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

 This front-end code uses private keys to sign a message. **NEVER**, **EVER** let anyone, man or machine, know your private key unless you know _exactly_ what you are doing. **PLEASE** download this package, install, disconnect your internet, check the code for any funny business, compile, disable/uninstall all extensions, turn off the lights, and run in a secure environment before inputting your private keys.
 
 **I AM NOT RESPONSIBLE FOR ANY LOSSES OR DAMAGES INCURRED FROM USING THIS SOFTWARE!!**

🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

---

**[tinyify](https://www.npmjs.com/package/tinyify) is used in the provided `dist/bitcoinjs.js` to remove all unused parts of [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) (of which there are many). _This package is strictly limited to message signing._**

---

# Quick Start - No Build

If you would like to run this on your local (or not!) machine, simply clone or download the repository and visit `dist/signmessage.html` in your browser. **🚨 BE CAREFUL. YOUR PRIVATE KEYS ARE INVOLVED!! 🚨**

# Build

1. Clone this repository: `git clone git@github.com:EvilJordan/bitcoinjs-message-signing.git`

2. `npm install`

3. if not already installed: `npm install -g browserify` - this package uses [browserify](https://browserify.org/) so everything runs in a front-end context

4. OPTIONAL: `npm install tinyify` - [tinyify](https://www.npmjs.com/package/tinyify) is used in the `dist/bitcoinjs.js` version to remove all unused parts of [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) (of which there are many). _This package is strictly limited to message signing._

5. IF USING TINYIFY: `browserify -p tinyify index.js -s bitcoinjs > dist/bitcoinjs.js`

6. IF **NOT** USING TINYIFY: `browserify index.js -s bitcoinjs > dist/bitcoinjs.js`

7. open a browser, then open the local file `dist/signmessage.html` to sign a message for Bitcoin (including Segwit), Litecoin, or Dogecoin addresses
