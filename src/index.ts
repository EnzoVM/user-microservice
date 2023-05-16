import express, {Request, Response} from 'express'
import morgan from 'morgan'
import userRoutes from './routes/user.routes'
const app = express()

app.set('PORT', process.env.PORT || 3000)
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (request: Request, response: Response) =>{
    response.status(201).json({
        message: 'User Microservice'
    }).end()
})

app.use('/api/v1/user', userRoutes)

app.listen(app.get('PORT'), ()=>{
    console.log(`Server running on port ${app.get('PORT')}`);
})
