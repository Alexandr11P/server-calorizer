import fs from 'fs'

export default function getFav(req, res) {
    const data = JSON.parse(fs.readFileSync(`./src/db/${req.headers.username}.json`, 'utf-8'));
    res.json(data.favorite);
}