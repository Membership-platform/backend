import bcrypt from 'bcryptjs';

import { SALT_ROUNDS } from 'src/constants/common';

export const hashPassword = (password: string, saltRound?: number) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(saltRound ?? SALT_ROUNDS));

export const comparePassword = (password: string, hashedPassword: string) =>
  bcrypt.compareSync(password, hashedPassword);
