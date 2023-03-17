import bcrypt from 'bcrypt'
import config from '../config/settings'

function create(password: string): string {
  const hash = bcrypt.hashSync(password, config.password.bcryptSaltRounds)
  return hash
}

export default {
  create,
}
