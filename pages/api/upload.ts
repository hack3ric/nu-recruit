// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { createTransport } from "nodemailer";

type Data = {};

let upload = multer({
  limits: {
    fileSize: 500 * 1024 * 1024
  }
})

let transporter = createTransport({
  sendmail: true,
  newline: 'unix',
  // path: '/usr/sbin/sendmail'
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: any,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, upload.single("resume"));
  let form = JSON.parse(req.body["basic"]);
  let resume = req.file;
  transporter.sendMail({
    // TODO: Use configuration
    from: "sender@example.com",
    to: "recipient@example.com",
    subject: `nu-recruit:${form.id};${form.name};${form.email};${form.orientation}`,
    attachments: [{
      filename: resume.originalname,
      encoding: resume.encoding,
      content: resume.buffer
    }]
  }, (err, info) => {
    console.log(err);
    console.log(info.envelope);
    console.log(info.messageId);
    console.log(info.response);
    // info.message.pipe(process.stdout);
  });
  res.status(200).json({});
}

export const config = {
  api: {
    bodyParser: false,
  },
}
