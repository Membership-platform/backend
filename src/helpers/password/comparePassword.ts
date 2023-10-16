import bcrypt from 'bcryptjs'

export default (password: string, hashedPassword: string) =>
	bcrypt.compareSync(password, hashedPassword)
