import { Router } from 'express'
import * as controllerProject from '../controllers/projects.api.controllers.js'
import * as controllerTag from '../controllers/tags.api.controllers.js'
import * as controllerState from '../controllers/states.api.controllers.js'
import * as controllerClient from '../controllers/clients.api.controllers.js'
import { tokenVerify } from '../../middlewares/token.validate.middleware.js'


const route = Router()

route.use('/data', tokenVerify)
route.use('/tag', tokenVerify)
route.use('/state', tokenVerify)
route.use('/client', tokenVerify)


// projects
route.get('/data', controllerProject.getData)
route.post('/data', controllerProject.createProject)
route.get('/data/:idProject', controllerProject.getProjectById)
route.put('/data/:idProject', controllerProject.replaceProject)
route.patch('/data/:idProject', controllerProject.updateProject)
route.delete('/data/:idProject', controllerProject.deleteProject)

// tags
route.get('/tag', controllerTag.getTag)
route.post('/tag', controllerTag.createTag)
route.put('/tag/:idTag', controllerTag.replaceTag)
route.patch('/tag/:idTag', controllerTag.updateTag)
route.delete('/tag/:idTag', controllerTag.deleteTag)

// states
route.get('/state', controllerState.getState)
route.post('/state', controllerState.createState)
route.put('/state/:idState', controllerState.replaceState)
route.patch('/state/:idState', controllerState.updateState)
route.delete('/state/:idState', controllerState.deleteState)

// users
route.get('/client', controllerClient.getClient)
route.post('/client', controllerClient.createClient)


export default route