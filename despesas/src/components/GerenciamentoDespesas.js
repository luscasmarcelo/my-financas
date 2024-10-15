// despesas/src/components/GerenciamentoDespesas.js
import React, { useState, useEffect } from 'react';
import { getDespesas, createDespesa, updateDespesa, deleteDespesa } from '../services/api';
import CadastroSalarioMes from './CadastroSalarioMes';

const GerenciamentoDespesas = ({ usuarioId }) => {
  const [despesas, setDespesas] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [novaDespesa, setNovaDespesa] = useState({ categoria: '', valor: '', descricao: '' });

  const fetchDespesas = async () => {
    try {
      const response = await getDespesas(usuarioId);
      setDespesas(response.data);
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
    }
  };

  useEffect(() => {
    fetchDespesas();
  }, [usuarioId, mesSelecionado]);

  const handleCreateDespesa = async () => {
    try {
      const response = await createDespesa({ ...novaDespesa, usuarioId, mes: mesSelecionado });
      setDespesas([...despesas, response.data]);
      setNovaDespesa({ categoria: '', valor: '', descricao: '' });
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
    }
  };

  const handleUpdateDespesa = async (id, despesaAtualizada) => {
    try {
      const response = await updateDespesa(id, despesaAtualizada);
      setDespesas(despesas.map((despesa) => (despesa._id === id ? response.data : despesa)));
    } catch (error) {
      console.error('Erro ao atualizar despesa:', error);
    }
  };

  const handleDeleteDespesa = async (id) => {
    try {
      await deleteDespesa(id);
      setDespesas(despesas.filter((despesa) => despesa._id !== id));
    } catch (error) {
      console.error('Erro ao deletar despesa:', error);
    }
  };

  return (
    <div>
      <CadastroSalarioMes onSave={(data) => console.log(data)} />
      <h2>Gerenciamento de Despesas</h2>
      
      {/* Filtro de Mês */}
      <select onChange={(e) => setMesSelecionado(e.target.value)}>
        <option value="">Selecione o Mês</option>
        <option value="Janeiro">Janeiro</option>
        <option value="Fevereiro">Fevereiro</option>
        <option value="Março">Março</option>
        <option value="Abril">Abril</option>
        <option value="Maio">Maio</option>
        <option value="Junho">Junho</option>
        <option value="Julho">Julho</option>
        <option value="Agosto">Agosto</option>
        <option value="Setembro">Setembro</option>
        <option value="Outubro">Outubro</option>
        <option value="Novembro">Novembro</option>
        <option value="Dezembro">Dezembro</option>
      </select>

      {/* Formulário para Adicionar Nova Despesa */}
      <div>
        <h3>Adicionar Nova Despesa</h3>
        <input
          type="text"
          placeholder="Categoria"
          value={novaDespesa.categoria}
          onChange={(e) => setNovaDespesa({ ...novaDespesa, categoria: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor"
          value={novaDespesa.valor}
          onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novaDespesa.descricao}
          onChange={(e) => setNovaDespesa({ ...novaDespesa, descricao: e.target.value })}
        />
        <button onClick={handleCreateDespesa}>Adicionar Despesa</button>
      </div>

      {/* Lista de Despesas */}
      <div>
        <h3>Despesas</h3>
        {despesas.map((despesa) => (
          <div key={despesa._id}>
            <p>Categoria: {despesa.categoria}</p>
            <p>Valor: {despesa.valor}</p>
            <p>Descrição: {despesa.descricao}</p>
            <button onClick={() => handleUpdateDespesa(despesa._id, { ...despesa, valor: despesa.valor + 10 })}>
              Editar
            </button>
            <button onClick={() => handleDeleteDespesa(despesa._id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciamentoDespesas;
