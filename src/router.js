
import Router from 'express'
import getMyprod from './controllers/getMyProd.js'
import checkAuth from './controllers/auth.js'
import getFav from './controllers/getFav.js'
import getAllProd from './controllers/getAllProd.js'
import reg from './controllers/reg.js'
import getEaten from './controllers/getEaten.js'
import addEaten from './controllers/addEaten.js'
import removeFav from './controllers/removeFav.js'
import removeMyprod from './controllers/removeMyProd.js'
import addMyprod from './controllers/addMyProd.js'
import addFav from './controllers/addFav.js'
import { checkSchema } from 'express-validator';

const schema = {
    b: { isNumeric: true },
    zh: { isNumeric: true },
    u: { isNumeric: true },
    date: { isEmpty: false },
}

const router = new Router()


router.get('/allprod', checkAuth, getAllProd)
router.get('/myprod', checkAuth, getMyprod)
router.get('/fav', checkAuth, getFav)
router.get('/eaten', checkAuth, getEaten)

router.post('/reg', reg)
router.post('/eaten', checkAuth, checkSchema(schema, ['body']), addEaten)
router.post('/myprod', checkAuth, addMyprod)
router.post('/fav', checkAuth, addFav)
router.post('/auth', checkAuth, (req, res) => { res.json({ status: 'okey' }) })

router.delete('/myprod', checkAuth, removeMyprod)
router.delete('/fav', checkAuth, removeFav)

router.get('/next', (_, res) => { res.json(json) })
export default router;