import bcrypt from 'bcrypt'
import fs from 'fs'


export default function reg(req, res) {

    const user = req.body;

    if (!(typeof user?.name === 'string'
        && typeof user?.password === 'string'
        && user?.password?.trim() !== ''
        && user?.name?.trim() !== '')) { return res.status(401).json({ message: 'Одно из полей не заполнено' }) }

    const users = JSON.parse(fs.readFileSync('./src/db/users.json', 'utf-8'));

    if (users.some((e) => user.name === e.name)) { return res.status(401).json({ message: 'Такой пользователь уже существует' }) };

    if (user.name === 'products' || user.name === 'users') { return res.status(401).json({ message: 'Такой пользователь уже существует' }) };

    if (user.name !== user.name.replace(/\W/, 0)) {
        return res.status(401)
            .json({ message: 'Имя пользователя должно состоять из символов латинского алфавита либо цифр' })
    }


    user.password = bcrypt.hashSync(user.password, 7);
    users.push(user);
    fs.writeFileSync('./src/db/users.json', JSON.stringify(users))
    fs.writeFileSync(`./src/db/${user.name}.json`, JSON.stringify({ favorite: [], myprod: [], journal: [] }))
    res.json({ message: "Пользователь успешно зарегистрирован" })
}