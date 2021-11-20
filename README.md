# NU Recruit

My entry to 2021 UESTC NetUnion recruit.

## Prerequisition

- Sendmail or an SMTP server
- Node.js v16

## Getting Started

First, set up your email environment in `config.json`, for example Sendmail:
```json
{
  "transport": {
    "sendmail": true,
    "newline": "unix",
    "path": "/usr/sbin/sendmail"
  },
  "fromEmail": null,
  "toEmail": "recipient@example.com"
}
```

For more information about field `transport`, see [SMTP transport](https://nodemailer.com/smtp/) and [Other transports](https://nodemailer.com/transports/) section of Nodemailer documentation.

And then, build and run:
```
npm run build
npm start
```

You may need a reverse proxy instead of directly serving it to the Internet.
