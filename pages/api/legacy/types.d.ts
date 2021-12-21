import {DateTime} from 'luxon'

export interface IMoonDay {
    dayNumber: number
    dayStart: DateTime
    dayEnd: DateTime
}

export interface IMoonPhase {
    symbol: string
    label: string
}

export interface IChat {
    chatId: number
    location: {
        type: string
        coordinates: [number, number]
    }
    moonDayNotified?: number
    solarDateNotified?: Date
}

export interface INotificationResult {
    chatId: number
    moonDayNotified?: number
    solarDateNotified?: Date
}
