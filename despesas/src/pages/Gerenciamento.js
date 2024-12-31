import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import GerenciamentoDespesas from '../components/GerenciamentoDespesas';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação

const Gerenciamento = () => {
    const { currentUser } = useAuth(); // Obtém o usuário autenticado
    const usuarioId = currentUser?.uid; // UID do usuário logado

    if (!usuarioId) {
        return <p>Erro: Usuário não autenticado.</p>
    }

    return (
        <PrivateRoute>
            <GerenciamentoDespesas usuarioId={usuarioId} />
        </PrivateRoute>
    );
};

export default Gerenciamento;
