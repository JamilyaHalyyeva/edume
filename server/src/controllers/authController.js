import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const handleRegister = async (req, res) => {
  try {
    const { username, surname, email, password, role } = req.body

    console.log('register: data is ', req.body)

    if (!username || !surname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({
      username,
      surname,
      email,
      password: hashedPassword,
      role,
    })
    const result = await newUser.save()

    console.log('User is registered', result)
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
