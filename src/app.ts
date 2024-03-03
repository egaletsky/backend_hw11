import express from 'express'
import {SETTINGS} from './settings';
import {videosRouter} from './videos/index';
import {testingRouter} from './testing/index';



export const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({hello: 'world'})
})

app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)
