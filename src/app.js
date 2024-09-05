import express from 'express';
import router from './router.js'
import path from 'path'
import https from 'https'
import fs from 'fs'
const PORT = 443;

const app = express();


app.use(express.json());
app.use(express.static('./static'));
app.use('/api', router)
app.use('*', (req, res) => {
    res.sendFile(`${path.resolve()}/static/index.html`);
});


const options = {
    key: fs.readFileSync('./ssl/certificate.key'),
    cert: fs.readFileSync('./ssl/certificate.crt'),
}

async function startApp() {
    try {
        https.createServer(options, app).listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp();
