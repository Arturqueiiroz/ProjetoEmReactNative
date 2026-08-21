import React from "react";
import { View, Text, Image, ToastAndroid, Platform, Alert, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
// Importação dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App_Aula5';


// Componentes
import { CustomTextInput } from "../../components/CustomTextInput";
import { RoundedButton } from '../../components/RoundedButton';
import styles from "../../theme/HomeCss";
// ViewModel
import useViewModel from './ViewModel';

export const HomeScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { userEmail, userPassword, onChange, login, loginBiometrico, loading } = useViewModel();

    const testOS = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Teste de Login! - Android', ToastAndroid.SHORT);
        } else if (Platform.OS === 'web') {
            alert('Teste de Login! - WEB');
        } else {
            Alert.alert('Aviso', 'Teste de Login! - iPhone');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/bg-smartphone.jpg')}
                style={styles.imgBg}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.frmWrapper}
            >
                <View style={styles.frm}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        bounces={false}
                    >
                        <Text style={styles.frmTitle}>
                            Entrar
                        </Text>

                        <CustomTextInput
                            image={require('../../../../assets/img/user.png')}
                            placeholder='Digite seu Email / Usuário...'
                            keyboardType="email-address"
                            secureTextEntry={false}
                            property='userEmail'
                            onChangeText={onChange}
                            value={userEmail}
                        />
                        <CustomTextInput
                            image={require('../../../../assets/img/password.png')}
                            placeholder='Digite sua senha...'
                            keyboardType="default"
                            secureTextEntry={true}
                            property='userPassword'
                            onChangeText={onChange}
                            value={userPassword}
                        />

                        <View style={{ marginTop: 30 }}>
                            <RoundedButton
                                text='Entrar'
                                onPress={() => login()}
                            />
                        </View>

                        {/* Acesso Biométrico (Digital ou Facial) */}
                        <TouchableOpacity 
                        style={{ marginTop: 20, alignItems: 'center' }}
                        onPress={() => loginBiometrico()}
                        >
                            <Image
                                source={require('../../../../assets/img/confirm_password.png')}
                                style={{ width: 35, height: 35, tintColor: '#E74C3', marginBottom: 5}}
                            />
                            <Text
                            style={{ color: '#E74C3C', fontWeight: 'bold', fontSize: 13}}
                            >
                                Entrar com Biometria / FaceId
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.frmRegistre}>
                            <Text>Crie sua conta!</Text>
                            {/* nome corrigido: era 'Register', a tela registrada é 'RegisterScreen' */}
                            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                                <Text style={styles.txtRegistre}> Registre-se</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.frmRegistre}>
                            <Text>Esqueceu sua senha?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('PassagemEmail')}>
                                <Text style={styles.txtRegistre}> Alterar Senha</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

export default HomeScreen