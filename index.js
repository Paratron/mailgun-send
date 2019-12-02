const querystring = require('querystring');
const https = require('https');

/**
 * This function actually sends your message to the API.
 * Pass an options object to have it sent to the API.
 * Available options can be found in the [Mailgun Docs](https://documentation.mailgun.com/en/latest/user_manual.html#sending-via-api)
 * @typedef sendFunction
 * @param {object} options
 * @param {string} options.from
 * @param {string} options.to
 * @param {string} options.text
 * @param {string} options.html
 * @return Promise
 */

/**
 * This initializes the module.
 * Pass your configured domain (to send messages from) and API key, here.
 * @param {string} domain
 * @param {string} apiKey
 * @param {string} [apiHostName=api.mailgun.net] You can overwrite this if you wish to use a different API host.
 * @returns {sendFunction}
 */
module.exports = (domain, apiKey, apiHostName = 'api.mailgun.net') => (options) => new Promise((resolve, reject) => {
	const postData = querystring.stringify(options);

	const requestConfig = {
		hostname: apiHostName,
		port: 443,
		path: `/v3/${domain}/messages`,
		method: 'POST',
		auth: `api:${apiKey}`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		}
	};

	const req = https.request(requestConfig, res => {
		let buffer = '';

		res.setEncoding('utf8');
		res.on('data', d => {
			buffer += d;
		});
		res.on('end', () => resolve(buffer));
	});

	req.on('error', (e) => {
		console.error(e);
		reject(e);
	});

	req.write(postData);
	req.end();
});
