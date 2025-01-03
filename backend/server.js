import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import despesasCrudRouter from './routes/despesas-crud.js';
import salarioMesRouter from './routes/salarioMes-crud.js';

const app = express();
const PORT = 5000;

//url de conexão ao mongoDB rodando no Docker
const mongoURI = 'mongodb://localhost:27017/despesasDB';

//conectando ao MongoDB com mongoose
mongoose.connect(mongoURI)
    .then(() => console.log('conectado ao MongoDB com sucesso'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Backend funcionando!');
});

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
})

app.use('/despesas', despesasCrudRouter);
app.use('/salarioMes', salarioMesRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
