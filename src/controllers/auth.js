import bcrypt from "bcrypt";
import fs from 'fs'

export default function checkAuth(req, res, next) {
    if (!(req.headers.username && req.headers.password)) { return res.status(401).json({ message: 'Неправильная форма' }) }
    const users = JSON.parse(fs.readFileSync('./src/db/users.json', 'utf-8'))
        .find((e) => e.name === req.headers.username)
    if (!users) { return res.status(401).json({ message: 'Такого пользователя не существует!' }) }
    if (bcrypt.compareSync(req.headers.password, users.password)) { return next() }
    res.status(401).json({ message: 'Неверный пароль!' })
}