import React, { useState } from "react";
import { Alert, Platform, ToastAndroid } from "react-native";
import { AuthServices } from "../../../Presentation/services/AuthServices";
const RegiserViewModel = () => {
    const [values, setValues] = useState({
        userName: '',
        userDisplayName: '',
        userEmail: '',
        userPhone: '',
        userPassword: '',
        userConfirmPassword: '',
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

    const register = async () => {
        if(!values.userDisplayName || !values.userEmail || !values.userPhone || !values.userPassword) {
            showFeedback('Atenção', 'Preencha todos os campos.');
            return;
        }
        if(values.userPassword !== values.userConfirmPassword) {
            showFeedback('EROO!', 'As senhas digitadas não coincidem!');
            return;
        }

        setLoading(true);

        try {
            const response = await AuthServices.registrar({
                userName: values.userName,
                userDisplayName: values.userDisplayName,        
                userEmail: values.userEmail,
                userPhone: values.userPhone,
                userPassword: values.userPassword
            });

        setLoading(false);

        if (response.status === 200) {
            showFeedback("Sucesso", response.data.message || 'Registro realizado com sucesso!');
        } else {
            showFeedback("Erro no cadastro!", response.data.message || 'Não foi possível realizar o cadastro. Tente novamente.');
        }
        } catch (error) {
            setLoading(false);
            showFeedback("Erro de conexão!", 'Não foi possível conectar com o servidor. Tente mais tarde.');
        }  
    }
    return {
        onChange,
        ...values,
        register,
    }
}

export default RegiserViewModel;