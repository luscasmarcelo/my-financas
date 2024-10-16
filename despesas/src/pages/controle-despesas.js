import React from 'react';
import GerenciamentoDespesas from '../components/GerenciamentoDespesas';

const ControleDespesasPage = () => {
  return (
    <div>
      <h1>Controle de Despesas</h1>
      <GerenciamentoDespesas usuarioId="usuario-exemplo" />
    </div>
  );
};

export default ControleDespesasPage;
