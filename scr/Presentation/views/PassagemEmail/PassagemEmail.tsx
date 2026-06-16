import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../GPS_App';

import { COLORS } from "../../theme/Apptheme";
import { RoundedButton } from "../../components/RoundedButton";
import { CustomTextInput } from "../../components/CustomTextInput";

import RecuperarSenhaViewModel from "./ViewModel";

export const RecuperarSenhaScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const {
        email,
        onChange,
        enviarEmail
    } = RecuperarSenhaViewModel();

    const enviar = () => {
        enviarEmail();
        navigation.navigate('AlterarSenha');
    };

    return (
        <View style={styles.container}>

            <Image
                source={require('../../../../assets/img/chef.jpg')}
                style={styles.imgBg}
            />

            <View style={styles.frm}>

                <Text style={styles.frmTitle}>
                    Recuperar Senha
                </Text>

                <CustomTextInput
                    image={require('../../../../assets/img/email.png')}
                    placeholder="Digite seu Email"
                    keyboardType="email-address"
                    secureTextEntry={false}
                    property='email'
                    onChangeText={onChange}
                    value={email}
                />

                <View style={{ marginTop: 10 }}>
                    <RoundedButton
                        text='Enviar'
                        onPress={() => enviar()}
                    />
                </View>

            </View>

        </View>
    );
};

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
        height: '35%',
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
});

export default RecuperarSenhaScreen;