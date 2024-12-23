
import React, { useState, useEffect } from 'react';
import api, { getDespesas, createDespesa, updateDespesa, deleteDespesa } from '../services/api';
import CadastroSalarioMes from './CadastroSalarioMes';


const GerenciamentoDespesas = ({ usuarioId }) => {
  const [despesas, setDespesas] = useState([]);
  const [mesSalario, setMesSalario] = useState('');
  const [filtroMes, setFiltroMes] = useState('');
  const [novaDespesa, setNovaDespesa] = useState({ categoria: '', valor: '', descricao: '' });
  const [despesaEdicao, setDespesaEdicao] = useState(null);
  const [salario, setSalario] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSalvarSalarioMes = async (data) => {
    setMesSalario(data.mes);
    setSalario(data.salario);

    try {
      await api.post('/salarioMes', { usuarioId, mes: data.mes, salario: data.salario});
    } catch (error) {
      console.error('Erro ao salvar salário e mês:', error);
    }
  }

  const calcularSaldoMensal = (salario, despesas) => {
    const totalDespesas = despesas.reduce((total, despesa) => total + Number(despesa.valor), 0);
    return salario - totalDespesas;
  }

  //função para buscar despesas com base no mês selecionado
  const fetchDespesas = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Buscando despesas para o mês:', filtroMes);
      const response = await getDespesas(usuarioId, filtroMes);
      setDespesas(response.data);
    } catch (error) {
      setError('Erro ao buscar despesas.');
      console.error('Erro ao buscar despesas:', error);
    } finally {
      setLoading(false);
    }
  };

  //relatorio mensal por categoria
  const agruparDespesasPorCategoria = (despesas) => {
    return despesas.reduce((acumulador, despesa) => {
      acumulador[despesa.categoria] = (acumulador[despesa.categoria] || 0) + Number(despesa.valor);
      return acumulador;
    }, {});
  }

  //atualiza as despesas quando o mês é selecionado
  useEffect(() => {
    console.log(`usuarioId: ${usuarioId}, filtroMes: ${filtroMes}`);
    const fetchSalarioMes = async () => {
      try {
        const response = await api.get(`/salarioMes/${usuarioId}/${filtroMes}`);
        if (response.data) {
          setMesSalario(response.data.mes);
          setSalario(response.data.salario);
        }
      } catch (error) {
        console.error('Erro ao buscar salário e mês:', error);
      }
    };
    
    if (filtroMes) {
      fetchSalarioMes();
      fetchDespesas();
    }
  }, [usuarioId, filtroMes]);

  //funcão de criação de nova despesa
  const handleCreateDespesa = async () => {
    if (!novaDespesa.categoria || !novaDespesa.valor || isNaN(novaDespesa.valor) || novaDespesa.valor <= 0) {
      alert('Por favor, insira uma categoria válida e um valor maior que 0.');
      return;
    }
    try {
      const response = await createDespesa({ ...novaDespesa, usuarioId, mes: mesSalario });
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

  const handleResetMensal = () => {
    const confirmacaoDel = window.confirm("Tem certeza que deseja resetar as despesas para este mês?");
    if (!confirmacaoDel) return;

    setDespesas([]);
    alert("Despesas do mês foram resetadas com sucesso!");
  }

  const saldoMensal = calcularSaldoMensal(salario, despesas);
  const categoriasTotais = agruparDespesasPorCategoria(despesas);

  return (
    <div>
      <CadastroSalarioMes onSave={handleSalvarSalarioMes} />
      <h2>Gerenciamento de Despesas</h2>

      {loading && <p>Carregando...</p>}
      {error && <p className='error'>{error}</p>}
      
      <div className={`saldo-mensal ${saldoMensal < 0 ? 'negativo' : 'positivo'}`}>
        Saldo do mês {filtroMes}: R$ {saldoMensal} de um capital de R$ {salario}
      </div>

      {/* Formulário para Adicionar Nova Despesa */}
      <div>
        <h3>Adicionar Nova Despesa</h3>
        <input
          type="text"
          placeholder="Categoria: Lazer, Comida, Transporte etc..."
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

      <h3>Consultar lista de despesas por mês:</h3>
      
      {/* Filtro de Mês */}
      <select onChange={(e) => setFiltroMes(e.target.value)} value={filtroMes}>
        <option value="">Selecione o mês</option>
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
    
    <button onClick={handleResetMensal} className='reset-button'>Resetar mês</button>

    <div className='relatorio-mensal'>
      <h3>Relatório de Despesas por categoria - {filtroMes}</h3>
      <ul>
        {Object.entries(categoriasTotais).map(([categoria, total]) => (
          <li key={categoria}>
            {categoria}: R$ {total}
          </li>
        ))}
      </ul>
    </div>

      {/* Lista de Despesas */}
      <div>
        <h3>Lista de Despesas</h3>
        {despesas.length > 0 ? (
          despesas.map((despesa) => (
            <div key={despesa._id}>
              <p>Categoria: {despesa.categoria}</p>
              <p>Valor: {despesa.valor}</p>
              <p>Descrição: {despesa.descricao}</p>
              <button onClick={() => startEditing(despesa)}>Editar</button>
              <button onClick={() => handleDeleteDespesa(despesa._id)}>Deletar</button>
            </div>
          ))
        ) : (
          <p>Nenhuma despesa encontrada para o mês selecionado.</p>
        )}
      </div>
    </div>
  );
};

export default GerenciamentoDespesas;