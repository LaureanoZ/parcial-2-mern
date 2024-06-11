import express from 'express'
import WebRoute from './routes/web.routes.js'
import ProjectsApiRoutes from './api/routes/projects.api.routes.js'
import AccountRoute from './api/routes/account.api.routes.js'
import uploadRoute from './api/routes/upload.api.routes.js'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/api', express.json())
app.use('/', express.static('public'))
app.use('/uploads', express.static('uploads'));


app.use('/', WebRoute)
app.use('/api', ProjectsApiRoutes)
app.use('/api', AccountRoute)
app.use('/api', uploadRoute)


app.listen(2222, function () {
    console.log('Server ON http://localhost:2222')
})
