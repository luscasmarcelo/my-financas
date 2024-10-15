import React, { useState } from 'react';

const CadastroSalarioMes = ({ onSave}) => {
    const [salario, setSalario] = useState(0);
    const [mes, setMes] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        onSave({ salario, mes});
    };

    return (
        <div>
            <h2>Cadastro de salário e mês</h2>
            <form onSubmit={handleSave}>
                <input
                    type="number"
                    placeholder='Salário'
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                />

                <select value={mes} onChange={(e) => setMes(e.target.value)}>
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
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default CadastroSalarioMes;