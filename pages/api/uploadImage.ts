// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
Amplify.configure(awsconfig);

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
  ) {
    if (req.method === 'POST') {
      res.status(200).json({ name: 'Sali Obien' })
    } else {
      res.status(400)
    }
  
}

