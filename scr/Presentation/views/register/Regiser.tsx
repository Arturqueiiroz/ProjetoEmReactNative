import React from "react";
import {
    StyleSheet, View, Text, Image, TextInput, Platform, ToastAndroid, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../GPS_App';

//Componentes
import styles from "../../theme/RegiserCss";
import { RoundedButton } from "../../components/RoundedButton";
import { CustomTextInput } from "../../components/CustomTextInput";
// ViewModel
import RegiserViewModel from './ViewModel';

export const RegisterScreen = () => {
        const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
        const { userEmail, userPassword, userName, userPhone, userConfirmPassword, onChange, cadastro } = RegiserViewModel();
    
    const testOS = () => {
        if (Platform.OS === 'android') {
            //Android: mostra o Toast nativo
            ToastAndroid.show('Teste de Cadastro! - Android', ToastAndroid.SHORT);
        } else if (Platform.OS === 'web') {
            //Navegar: usa o alert do JS classico
            alert('Teste de Cadastro! - WEB');
        } else {//IOS: usa o alert nativo do IPhone
            Alert.alert('Aviso', 'Teste de Cadastro! - iPhone');
        }
    };
    return (
        <View style={styles.container}>

            <Image
                source={require('../../../../assets/img/chef.jpg')}
                style={styles.imgBg}
            />
            
            <View style={styles.photoContainer}>
                <Image
                    source={require('../../../../assets/img/user_image.png')}
                    style={styles.photo}
                />

                <Text style={styles.photoText}>
                    Selecione uma imagem
                </Text>
            </View>

            <View style={styles.frm}>

                <Text style={styles.frmTitle}>
                    Registre-se
                </Text>

            <CustomTextInput
                image={require('../../../../assets/img/user.png')}
                placeholder="Digite seu Nome"
                keyboardType="default"
                secureTextEntry={false}
                property='userName'
                onChangeText={onChange}
                value={userName}
            />

            <CustomTextInput
                image={require('../../../../assets/img/email.png')}
                placeholder="Digite seu Email"
                keyboardType="email-address"
                secureTextEntry={false}
                property='userEmail'
                onChangeText={onChange}
                value={userEmail}
            />

            <CustomTextInput
                image={require('../../../../assets/img/phone.png')}
                placeholder="Digite seu Telefone"
                keyboardType="numeric"
                secureTextEntry={false}
                property='userPhone'
                onChangeText={onChange}
                value={userPhone}
            />

            <CustomTextInput
                image={require('../../../../assets/img/password.png')}
                placeholder="Digite sua senha"
                keyboardType="default"
                secureTextEntry={true}
                property='userPassword'
                onChangeText={onChange}
                value={userPassword}
            />

            <CustomTextInput
                image={require('../../../../assets/img/confirm_password.png')}
                placeholder="Confirme a senha"
                keyboardType="default"
                secureTextEntry={true}
                property='userConfirmPassword'
                onChangeText={onChange}
                value={userConfirmPassword}
            />

                <View style={{ marginTop: 10 }}>
                    <RoundedButton
                        text='Entrar'
                        onPress={ () => cadastro() }
                    //onPress={() => ToastAndroid.show('Teste de Login!', ToastAndroid.SHORT)} 
                    />
                </View>

            </View>

        </View>
    );
};

export default RegisterScreen;