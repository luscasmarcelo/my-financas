// despesas/src/components/GerenciamentoDespesas.js
import React, { useState, useEffect } from 'react';
import { getDespesas, createDespesa, updateDespesa, deleteDespesa } from '../services/api';
import CadastroSalarioMes from './CadastroSalarioMes';

const GerenciamentoDespesas = ({ usuarioId }) => {
  const [despesas, setDespesas] = useState([]);
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [novaDespesa, setNovaDespesa] = useState({ categoria: '', valor: '', descricao: '' });
  const [despesaEdicao, setDespesaEdicao] = useState(null);

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
    if (!novaDespesa.categoria || !novaDespesa.valor) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const response = await createDespesa({ ...novaDespesa, usuarioId, mes: mesSelecionado });
      setDespesas([...despesas, response.data]);
      setNovaDespesa({ categoria: '', valor: '', descricao: '' });
      alert('Despesa adicionada com sucesso!')
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
    }
  };

  const startEditing = (despesa) => {
    setDespesaEdicao(despesa);
  }

  const handleSaveEdit = async ()=> {
    try {
      const response = await updateDespesa(despesaEdicao._id, despesaEdicao);
      setDespesas(despesas.map((despesa) => (despesa._id === despesaEdicao._id ? response.data : despesa)));
      setDespesaEdicao(null);
      alert("Despesa atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar despesa.");
      console.error(error);
    }
  };

  const handleDeleteDespesa = async (id) => {
    try {
      await deleteDespesa(id);
      setDespesas(despesas.filter((despesa) => despesa._id !== id));
      alert("Despesa deletada com sucesso!")
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

      {despesaEdicao && (
        <div>
          <h3>Editar Despesa</h3>
          <input type="text" placeholder='Categoria' value={despesaEdicao.categoria} onChange={(e) => setDespesaEdicao({ ...despesaEdicao, categoria: e.target.value})} />
          <input type='number' placeholder='Valor' value={despesaEdicao.valor} onChange={(e) => setDespesaEdicao({ ...despesaEdicao, valor: e.target.value })} />
          <input type='text' placeholder='Descrição' value={despesaEdicao.descricao} onChange={(e) => setDespesaEdicao({ ...despesaEdicao, descricao: e.target.value })} />

          <button onClick={handleSaveEdit}>Salvar Alterações</button>
          <button onClick={() => setDespesaEdicao(null)}>Cancelar</button>
        </div>
      )}

      {/* Lista de Despesas */}
      <div>
        <h3>Despesas</h3>
        {despesas.map((despesa) => (
          <div key={despesa._id}>
            <p>Categoria: {despesa.categoria}</p>
            <p>Valor: {despesa.valor}</p>
            <p>Descrição: {despesa.descricao}</p>
            <button onClick={() => startEditing(despesa)}>Editar</button>
            <button onClick={() => handleDeleteDespesa(despesa._id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerenciamentoDespesas;
