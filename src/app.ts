import 'dotenv/config'
import http, { Server } from 'http'
import express, { Express, Request, Response, NextFunction } from 'express'
import createError, { HttpError } from 'http-errors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'

import routes from 'src/routes'
// import sockets from 'src/services/socketIo';
import {
	HTTP_NOT_FOUND,
	HTTP_SERVER_ERROR,
} from 'src/constants/httpStatusCodes'

const app: Express = express()
const server: Server = http.createServer(app)
// const io = sockets(server);

app.use(cors({ credentials: false }))
app.use(logger('development'))
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// app.use((_ _, next) => {
// 	// req.io = io;
// 	next()
// })

app.use('/api/v1', routes)

// catch 404 and forward to error handler
app.use((_: Request, __: Response, next) => {
	next(createError(HTTP_NOT_FOUND))
})

// error handler
app.use(
	(err: HttpError, req: Request, res: Response, next: NextFunction): void => {
		// set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get('env') === 'development' ? err : {}

		// render the error page
		res.status(err.status || HTTP_SERVER_ERROR)
		res.send({ message: err.message, status: err.status, error: err })
		next()
	},
)

export { app, server }
