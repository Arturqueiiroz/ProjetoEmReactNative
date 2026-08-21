import React, { useState } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import { AuthServices } from "../../../Presentation/services/AuthServices";
import { BiometricService } from "../../../Presentation/services/BiometricService";
const HomeViewModel = () => {
    const [values, setValues] = useState({
        userEmail: '',
        userPassword: '',
    });

    const [loading, setLoading] = useState(false);
    
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const showFeedback = (title: string, message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(`${title}: ${message}`, ToastAndroid.LONG);
        } else {
            Alert.alert(title, message);
        }
    };

    const login = async () => {
        if(!values.userPassword || !values.userEmail) {
            showFeedback('Atenção', 'Preencha o email e a senha!');
            return;
        }
        setLoading(true);
        try {
            const response = await AuthServices.login(values);
            setLoading(false);

            if (response.status === 200) {
                showFeedback("Sucesso", "Login realizado com sucesso!");
            } else {
                showFeedback("Erro no login!", response.data?.message || "Credenciais inválidas.");
            }
        } catch (error) {
            setLoading(false);
            // console.error('Erro de conexão:', "Não foi possível conectar com o servidor backEnd");
            showFeedback("Erro!", "Sistema indisponível tente mais tarde.");
        }

        console.log(JSON.stringify(values));
    }

    // Login via Biometria (Digital ou Facial)

    const loginBiometrico = async () => {
        const disponivel = await BiometricService.isBiometricAvailable();
        if (!disponivel) {
            showFeedback("Biometria Indisponivel", "Seu aparelho não possui biometria configurada.");
            return;
        }
        const autenticado = await BiometricService.autenticarComBiometria("Toque no sensor ou use o reconhecimento facial!");

        if(autenticado) {
            showFeedback("Sucesso", "Acesso biométrico autorizado!");
        } else {
            showFeedback("Aviso!", "Autenticação biométrico não concluída.");
        }
    };
    return {
        ...values,
        onChange,
        login,
        loginBiometrico,
        loading,
    }
}

export default HomeViewModel;