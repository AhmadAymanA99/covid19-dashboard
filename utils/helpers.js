import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const fetch = require("node-fetch")

export const firebaseConfig = {
    apiKey: "AIzaSyC_VmTtGnKaVaC36JjCnqqpfCA1A19pkh4",
    authDomain: "cbsd-project-ed2bc.firebaseapp.com",
    databaseURL: "https://cbsd-project-ed2bc.firebaseio.com",
    projectId: "cbsd-project-ed2bc",
    storageBucket: "cbsd-project-ed2bc.appspot.com",
    messagingSenderId: "694918036358",
    appId: "1:694918036358:web:c2287190cad71cb5608a07",
    measurementId: "G-38V4645TP5"
}

export const api = () => {
    return fetch("https://api.covid19api.com/summary")
        .then((response) => response.json())
        .then((data) => {
            data.Countries.sort((a, b) => {
                return a["TotalConfirmed"] < b["TotalConfirmed"]
            })
            return {
                sum: data.Global,
                date: data.Countries[0]["Date"],
                Countries: data.Countries
            }
        })
}

export const countriesAPI = (country) => {
    return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${country}&key=bc242637ff4a4107b0eae494a73b5f2a&pretty=1`)
        .then((response) => response.json())
        .then((data) => {
            return {
                geometry: data.results[0].geometry
            }
        })

}



const NOTIFICATION_KEY = 'UdaciFlashcards:notifications'

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'See the last Updates..',
        body: "'👋 don't forget to see the dashboard for today updates!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        },
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate())
                            tomorrow.setHours(18)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}