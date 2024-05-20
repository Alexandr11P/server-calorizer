import { validationResult } from 'express-validator';
import fs from 'fs'


export default function getEaten(req, res) {
    if (validationResult(req).errors[0]) { return res.status(404).send({ message: 'Неверный формат журнала' }) }
    const data = JSON.parse(fs.readFileSync(`./src/db/${req.headers.username}.json`, 'utf-8'));
    const i = data.journal.findIndex((e) => e.date === req.body.date)
    if (i === -1) { data.journal = data.journal.slice(-29); data.journal.push(req.body) }
    else {
        const { b: b1, zh: zh1, u: u1 } = req.body;
        const { b, zh, u, date } = data.journal[i];
        data.journal[i] = { b: b + b1, zh: zh + zh1, u: u + u1, date: date }
    }
    fs.writeFileSync(`./src/db/${req.headers.username}.json`, JSON.stringify(data))
    res.json({ message: 'journal updated' })
}