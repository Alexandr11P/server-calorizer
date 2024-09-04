import express from 'express';
import router from './router.js'
import path from 'path'

const PORT = 5555;

const app = express();


app.use(express.json());
app.use(express.static('./static'));
app.use('/api', router)
app.use('*', (req, res) => {
    res.sendFile(`${path.resolve()}/static/index.html`);
});

async function startApp() {
    try {
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp();