window.addEventListener('load', async () => {
	appendNetworks();
	const currency = document.getElementById('currency');
	const signMessageButton = document.getElementById('signMessageButton');
	const publicAddress = document.getElementById('publicAddress');
	const privateKey = document.getElementById('privateKey');
	const signMessageSignature = document.getElementById('signMessageSignature');
	const signForm = document.getElementById('signForm');
	signMessageSignature.innerText = signMessageSignature.dataset['placeholder'];
	currency.onchange = function() {
		if(this.value === 'ETH') {
			alert('Visit https://app.mycrypto.com/sign-message to sign your message');
		} else if(this.value != 0) {
			signMessageButton.removeAttribute('disabled');
			publicAddress.removeAttribute('disabled');
			privateKey.removeAttribute('disabled');
		} else {
			signMessageButton.setAttribute('disabled', true);
			publicAddress.setAttribute('disabled', true);
			privateKey.setAttribute('disabled', true);
			signMessageSignature.style.color = '#CCC';
			signMessageSignature.innerText = signMessageSignature.dataset['placeholder'];
			signForm.reset();
		}
	}
	signForm.onsubmit = function(event) {
		event.preventDefault();
		sign();
	}
});

function sign() {
	const message = document.getElementById('message');
	const networkName = NETWORKS[currency.value];
	const networks = bitcoinjs.networks[networkName];
	try {
		keyPair = bitcoinjs.ECPair.fromWIF(privateKey.value, networks);
	} catch(e) {
		console.log(e);
		alert('Are you sure you picked the right currency for this address?');
		return;
	}
	let options = {};
	options.extraEntropy = bitcoinjs.randomBytes(32);
	if(networkName === 'bitcoin' && (/^3/).test(publicAddress.value)) { options.segwitType = 'p2sh(p2wpkh)'; }
	if(networkName === 'bitcoin' && (/^bc1/).test(publicAddress.value)) { options.segwitType = 'p2wpkh'; }
	const signature = bitcoinjs.bitcoinMessage.sign(message.value, keyPair.privateKey, keyPair.compressed, networks.messagePrefix, options);
	signMessageSignature.innerText = signature.toString('base64');
	signMessageSignature.style.color = '#000';
}

const NETWORKS = {
	BTC: 'bitcoin',
	LTC: 'litecoin',
	DOGE: 'dogecoin'
};

function appendNetworks() {
	// extend bitcoinjs to support message signing for forked cryptocurrencies
	bitcoinjs.networks.litecoin = {
		messagePrefix: '\x19Litecoin Signed Message:\n',
		bech32: 'ltc',
		bip32: {
			public: 0x019da462,
			private: 0x019d9cfe
		},
		pubKeyHash: 0x30,
		scriptHash: 0x32,
		wif: 0xb0
	}; 
	bitcoinjs.networks.dogecoin = {
		messagePrefix: '\x19Dogecoin Signed Message:\n',
		bip32: {
			public: 0x02facafd,
			private: 0x02fac398
		},
		pubKeyHash: 0x1e,
		scriptHash: 0x32,
		wif: 0x9e
	};
}