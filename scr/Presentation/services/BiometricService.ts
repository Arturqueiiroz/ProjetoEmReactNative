// sr/services/BiometricService.ts

import * as LocalAuthentication from "expo-local-authentication"

export const BiometricService = {
    // 1 Verificar se o hardware do celular suporta biometria
    isBiometricAvailable: async (): Promise<boolean> => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        return hasHardware && isEnrolled;
    },

    // 2. Dispara a leitura biométrica (Digital ou Facial)
    autenticarComBiometria: async (mensagem: string = 'Autentique-se para continuar'): Promise<boolean> => {
        try {
            const disponvel = await BiometricService.isBiometricAvailable();
            if (!disponvel) {
                return false;
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: mensagem,
                fallbackLabel: 'Use senha padrão',
                cancelLabel: 'Cancelar',
            });

            return result.success;
        } catch (error) {
            console.error('Erro na autenticação biométrica:', error);
            return false;
        }
    }
};



