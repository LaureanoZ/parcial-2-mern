import express from 'express'
import * as controller from '../controllers/data.controllers.js'

const route = express.Router()

route.get('/mobile', controller.getDataMobile)

route.get('/landing', controller.getDataLanding)

route.get('/webapp', controller.getDataWebApp)

route.get('/ecommerce', controller.getDataECommerce)

route.get('/game', controller.getDataGame)


export default route