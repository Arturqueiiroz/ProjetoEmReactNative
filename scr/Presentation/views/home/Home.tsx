import  React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button, ToastAndroid, Platform, Alert, TouchableOpacity } from 'react-native';
// Importação dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../GPS_App';

// Componente 
import { COLORS } from "../../theme/Apptheme";
import { CustomTextInput } from "../../components/CustomTextInput";
import { RoundedButton } from '../../components/RoundedButton';
// ViewModel
import useViewModel from './ViewModel';


export const HomeScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { userEmail, userPassword, onChange, login } = useViewModel();

    const testOS = () => {
        if (Platform.OS === 'android') {
            //Android: mostra o Toast nativo
            ToastAndroid.show('Teste de Login! - Android', ToastAndroid.SHORT);
        } else if (Platform.OS === 'web') {
            //Navegar: usa o alert do JS classico
            alert('Teste de Login! - WEB');
        } else {//IOS: usa o alert nativo do IPhone
            Alert.alert('Aviso', 'Teste de Login! - iPhone');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/bg-smartphone.jpg')}
                style={styles.imgBg}
            />

            <View style={styles.frm}>
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
                        onPress={ () => login() }
                        //onPress={() => ToastAndroid.show('Teste de Login!', ToastAndroid.SHORT)} 
                    />
                </View>


                <View style={styles.frmRegistre}>
                    <Text>Crie sua conta!</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.txtRegistre}> Registre-se</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.frmRegistre}>
                    <Text>Esqueceu sua senha?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('PassagemEmail')}>
                    <Text style={styles.txtRegistre}> Alterar Senha</Text>
                    </TouchableOpacity>
                </View>                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    frm: {
        width: '100%',
        height: '45%',
        backgroundColor: COLORS.bgColor,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
    },

    frmTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.bgBlack,
    },
    frmRegistre: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },

    txtRegistre: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        borderBottomColor: COLORS.secundary,
        borderBottomWidth: 1,
        marginLeft: 5,
        color: COLORS.secundary,

    },
});

export default HomeScreen