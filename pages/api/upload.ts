import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { createTransport } from "nodemailer";
import fs from "fs";
import { URLSearchParams } from "url";

type Data = {};

let upload = multer({
  limits: {
    fileSize: 500 * 1024 * 1024
  }
})

let { transport, fromEmail, toEmail } = JSON.parse(fs.readFileSync("config.json").toString());
let transporter = createTransport(transport);

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

  let params = new URLSearchParams();
  for (let [k, v] of Object.entries(form as { [name: string]: string })) {
    params.append(k, v)
  }

  let t = await transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: `nu-recruit?${params.toString()}`,
    attachments: [{
      filename: resume.originalname,
      encoding: resume.encoding,
      content: resume.buffer
    }]
  });
  console.log(t);
  res.status(200).json({})
}

export const config = {
  api: {
    bodyParser: false,
  }
}
