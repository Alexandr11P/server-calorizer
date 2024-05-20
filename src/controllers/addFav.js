import fs from 'fs'

export default function removeFav(req, res) {
    const data = JSON.parse(fs.readFileSync(`./src/db/${req.headers.username}.json`, 'utf-8'));
    data.favorite.push(req.body.id)
    fs.writeFileSync(`./src/db/${req.headers.username}.json`, JSON.stringify(data))
    res.json({ message: 'Продукт добавлен в избранное' })
}