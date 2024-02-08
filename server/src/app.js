import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.routes.js'

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use("/api/user", userRouter)

export default app