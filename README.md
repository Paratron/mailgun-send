#Mailgun send
My approach to a tiny mailgun sender wrapper using zero dependencies.

## Install

    npm i mailgun-tiny

## Usage

```javascript
const domain = 'example.com';
const apiKey = 'api-ofsjhdf971h2orjwer';
const sendMail = require('mailgun-tiny')(domain, apiKey);

sendMail({
    from: 'test@example.com',
    to: 'john.doe@example.com',
    subject: 'Hey there',
    text: 'How are you doing?'
});
```

Thats it.

xoxo
