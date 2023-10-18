import nodemailer from 'nodemailer'

const Transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.NODE_MAILER_USER,
		pass: process.env.NODE_MAILER_PASS,
	},
})

export default Transporter
