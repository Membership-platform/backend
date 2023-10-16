import bcrypt from 'bcryptjs'

export default (password: string) =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(8))
