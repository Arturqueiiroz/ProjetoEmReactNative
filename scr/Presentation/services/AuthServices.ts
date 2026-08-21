// src/services/AuthServices.ts
import { API_BASE_URL } from './apiConfigs';

export const AuthServices = {
    login: async (credencias: { userEmail: string; userPassword: string }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    login: credencias.userEmail,   // aceita Email ou NomeUsuario, aqui mandamos o email
                    senha: credencias.userPassword
                })
            });
            const data = await response.json();

            return { status: response.status, data };
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    },

    // Chama o endpoint [HttpPost("registrar")]
    registrar: async (credencias: {
        userName: string,
        userDisplayName: string,
        userEmail: string,
        userPhone: string,
        userPassword: string,
        userImage?: string,
    }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nome: credencias.userName,
                    nomeUsuario: credencias.userDisplayName,
                    email: credencias.userEmail,
                    telefone: credencias.userPhone,
                    senha: credencias.userPassword,
                    imagemUrl: credencias.userImage || null
                })
            });
            const data = await response.json();

            return { status: response.status, data };
        } catch (error) {
            console.error('Erro de comunicação com a API C#:', error);
            throw error;
        }
    }
};

export default AuthServices;