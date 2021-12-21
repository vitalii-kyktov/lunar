import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  day: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ day: 7 })
}
