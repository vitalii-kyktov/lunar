import type { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from 'luxon'
import { calculateMoonDayFor } from './legacy/moon-calc'
import fs from 'fs'

type Request = NextApiRequest & {
  query: {
    lat: string
    lon: string
  }
}

type Data =
  | {
      dayNumber: number
      dayStart: string
      dayEnd: string
    }
  | {
      error: string
    }

export default function handler(req: Request, res: NextApiResponse<Data>) {
  const { lat, lon } = req.query
  const lunarDay = calculateMoonDayFor(DateTime.utc(), {
    lat: Number(lat),
    lon: Number(lon),
  })

  if (!lunarDay) {
    res.status(500).json({
      error: 'Could not calculate lunar day',
    })
    return
  }

  fs.writeFileSync('/tmp/lunar-day.json', JSON.stringify(lunarDay, null, 2))
  console.log('file written')

  res.status(200).json({
    dayNumber: lunarDay.dayNumber,
    dayStart: lunarDay.dayStart.toISO(),
    dayEnd: lunarDay.dayEnd.toISO(),
  })
}
