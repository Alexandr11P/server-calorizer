import express from 'express';
import router from './router.js'
import cors from 'cors'

const PORT = 80;

const app = express();


app.use(express.json());
app.use(express.static('./src/static'));
app.use('/', router)

async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp();