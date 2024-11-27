import express from 'express';
import SalarioMes from '../models/SalarioMes.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { usuarioId, mes, salario } = req.body;
    try {
        const salarioMes = await SalarioMes.findOneAndUpdate(
            { usuarioId, mes },
            { salario },
            { new: true, upsert: true }
        );
        res.status(200).json(salarioMes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar salário e mês.', error: error.message});
    }
});

router.get('/:usuarioId/:mes', async (req, res) => {
    const { usuarioId, mes } = req.params;
    try {
        const salarioMes = await SalarioMes.findOne({ usuarioId, mes });
        if (salarioMes) {
            res.json(salarioMes);
        } else {
            res.status(404).json({ message: 'Salário e mês não encontrados.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar salário e mês', error: error.message });
    }
});

export default router;