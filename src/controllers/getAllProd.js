import fs from 'fs'

export default function getAllProd(req, res) {
    const products = fs.readFileSync('./src/db/products.json', 'utf-8');
    res.send(products);
}