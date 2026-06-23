import  React, { useState } from "react";
import { View, Text, Image, ToastAndroid, Platform, Alert, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
// Importação dos elementos de navegação
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../GPS_App';

// Componente 
import { CustomTextInput } from "../../components/CustomTextInput";
import { RoundedButton } from '../../components/RoundedButton';
import styles from "../../theme/HomeCss";
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

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1}}
        >
        
            <View style={styles.container}>
                <Image
                    source={require('../../../../assets/bg-smartphone.jpg')}
                    style={styles.imgBg}
                />


                    <View style={styles.frm}>
                        
                        <ScrollView 
                            contentContainerStyle={{ flexGrow: 1}}
                            showsVerticalScrollIndicator={false}
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

                        </ScrollView>

                    </View>


            </View>
        </KeyboardAvoidingView>
    );
}

export default HomeScreen