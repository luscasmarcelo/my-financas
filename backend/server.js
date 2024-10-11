import express from 'express';
import mongoose, { mongo } from 'mongoose';
import cors from 'cors';

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

app.get('/', (req, res) => {
    res.send('Backend funcionando!');
});

import despesasCrudRouter from './routes/despesas-crud.js'
app.use('/despesas', despesasCrudRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
