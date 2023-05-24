import express, {Request, Response} from 'express'
import morgan from 'morgan'
import userRoutes from './routes/user.routes'
import roleRoutes from './routes/role.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerSetup from './docs/swagger'

const app = express()

app.set('PORT', process.env.PORT || 3000)
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (request: Request, response: Response) =>{
    response.status(201).json({
        message: 'User Microservice'
    }).end()
})

app.use('/docs', swaggerUi.serve,swaggerUi.setup(swaggerSetup))
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/roles', roleRoutes)

const server = app.listen(app.get('PORT'), ()=>{
    console.log(`Server running on port ${app.get('PORT')}`);
})

export default {
    app,
    server
}