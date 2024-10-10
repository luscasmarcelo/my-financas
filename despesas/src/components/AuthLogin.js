import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login realizado com sucesso!');
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message)
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Avançar</button>
            </form>
        </div>
    );
};

export default Login;