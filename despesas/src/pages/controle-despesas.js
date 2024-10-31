import React from 'react';
import GerenciamentoDespesas from '../components/GerenciamentoDespesas';

const ControleDespesasPage = () => {
  return (
    <div>
      <h1>MY FINANÇAS</h1>
      <GerenciamentoDespesas usuarioId="usuario-exemplo" />
    </div>
  );
};
console.log("Aplicação carregada")
export default ControleDespesasPage;
