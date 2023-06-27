import { Router } from 'express'
import * as controllers from '../controllers/account.controllers.js'
import { validateAccount, validateProfile } from '../../middlewares/account.validate.middleware.js'
import { tokenVerify } from '../../middlewares/token.validate.middleware.js'


const router = Router()

// /register
router.post('/account', [validateAccount], controllers.createAccount)

router.post('/profile', [tokenVerify, validateProfile], controllers.createProfile)
router.patch('/profile/:idProfile', [tokenVerify, validateProfile], controllers.updateProfile)
router.get('/profile', [tokenVerify], controllers.getProfile)

// login
router.post('/session', [validateAccount], controllers.login)
// logout
router.delete('/session', [tokenVerify], controllers.logout)


export default router