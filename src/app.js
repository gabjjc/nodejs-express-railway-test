import express from 'express'

import usuariosRoutes from './routes/usuarios.routes.js';

const app = express()

app.use(express.json())
app.use(usuariosRoutes)

app.use((req , res, next) => {
    res.status(404).json({
        message: 'not found'
    })
})

export default app;