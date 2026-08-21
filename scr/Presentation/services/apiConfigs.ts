// src/services/apiConfigs.ts

// Para Emulador Android Studio use o IP: 10.0.2.2
// Insira a porta de uso dado pelo Visual Studio 2022 - C#

const IP_SERVIDOR = '10.0.2.2';
const PORTA = '5262';
// O endereço de endPonint vem do Visual Studio 2022 - C# -- /api/Usuarios/registrar ou /api/Usuarios/login
// porem como estou passando apenas o API base de URL podendo no futuro logar ou registrar um usuario para na classe 'Usuarios'
export const API_BASE_URL = `http://${IP_SERVIDOR}:${PORTA}/api/Usuario`;

