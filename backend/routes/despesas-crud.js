import express from 'express';
import Despesa from '../models/Despesa.js';
const router = express.Router();

//Criar uma nova despesa
router.post('/', async (req, res) => {
    try {
        const despesa = new Despesa(req.body);
        await despesa.save();
        res.status(201).json(despesa);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

//Listar todas as despesas de um usuário
router.get('/:usuarioId/', async (req, res) => {
    try {
        const despesas = await Despesa.find({ usuarioId: req.params.usuarioId});
        res.json(despesas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:usuarioId/:mes', async (req, res) => {
  try {
    const despesas = await Despesa.find({ usuarioId: req.params.usuarioId, mes: req.params.mes });
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Atualizar uma despesa
router.put('/:id', async (req, res) => {
    try {
      const despesaAtualizada = await Despesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(despesaAtualizada);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //Deletar uma despesa
  router.delete('/:id', async (req, res) => {
    try {
      await Despesa.findByIdAndDelete(req.params.id);
      res.json({ message: 'Despesa deletada com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  export default router;