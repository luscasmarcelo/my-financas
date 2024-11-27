import express from 'express';
import Despesa from '../models/Despesa.js';

const router = express.Router();

// Criar uma nova despesa
router.post('/', async (req, res) => {
  const { usuarioId, mes, categoria, valor, descricao } = req.body;

  // Validação de campos obrigatórios
  if (!usuarioId || !mes || !categoria || !valor) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
  }

  try {
    const despesa = new Despesa({ usuarioId, mes, categoria, valor, descricao });
    await despesa.save();
    res.status(201).json(despesa);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao salvar despesa.', error: error.message });
  }
});

// Listar todas as despesas de um usuário, com filtro opcional de mês
router.get('/:usuarioId/:mes?', async (req, res) => {
  const { usuarioId, mes } = req.params;

  try {
    let query = { usuarioId };
    if (mes) {
      query.mes = mes;
    }
    console.log('Consulta para despesas:', query); // Para depuração
    const despesas = await Despesa.find(query).limit(50); // Limita a 50 resultados
    res.json(despesas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar despesas.', error: error.message });
  }
});

// Atualizar uma despesa
router.put('/:id', async (req, res) => {
  const { categoria, valor } = req.body;

  // Validação de campos obrigatórios
  if (!categoria || !valor) {
    return res.status(400).json({ message: 'Categoria e valor são obrigatórios para atualização.' });
  }

  try {
    const despesaAtualizada = await Despesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!despesaAtualizada) {
      return res.status(404).json({ message: 'Despesa não encontrada.' });
    }
    res.json(despesaAtualizada);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar despesa.', error: error.message });
  }
});

// Deletar uma despesa
router.delete('/:id', async (req, res) => {
  try {
    const despesa = await Despesa.findById(req.params.id);
    if (!despesa) {
      return res.status(404).json({ message: 'Despesa não encontrada.' });
    }

    await Despesa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Despesa deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar despesa.', error: error.message });
  }
});

export default router;
