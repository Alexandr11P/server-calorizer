import fs from 'fs'

export default function removeFav(req, res) {
    const data = JSON.parse(fs.readFileSync(`./src/db/${req.headers.username}.json`, 'utf-8'));
    req.body.id = data.myprod.slice(-1).id + 1
    data.myprod.push(req.body)
    fs.writeFileSync(`./src/db/${req.headers.username}.json`, JSON.stringify(data))
    res.json({ message: 'Продукт добавлен' })
}