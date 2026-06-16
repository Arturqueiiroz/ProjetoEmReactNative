import React from "react";
import { StyleSheet, View, Text,Image, } from "react-native";

import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../GPS_App';

// Componentes
import { COLORS } from "../../theme/Apptheme";
import { RoundedButton } from "../../components/RoundedButton";
import { CustomTextInput } from "../../components/CustomTextInput";

// ViewModel
import AlterarSenhaViewModel from "./ViewModel";

export const AlterarSenhaScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { token, usuario, novaSenha, confirmarSenha, onChange,alterarSenha } = AlterarSenhaViewModel();

    return (
        <View style={styles.container}>

            <Image
                source={require('../../../../assets/img/chef.jpg')}
                style={styles.imgBg}
            />

            <View style={styles.frm}>

                <Text style={styles.frmTitle}>
                    Alterar Senha
                </Text>

                <CustomTextInput
                    image={require('../../../../assets/img/user.png')}
                    placeholder="Digite seu Token"
                    keyboardType="default"
                    secureTextEntry={false}
                    property='token'
                    onChangeText={onChange}
                    value={token}
                />

                <CustomTextInput
                    image={require('../../../../assets/img/user.png')}
                    placeholder="Digite seu Usuário"
                    keyboardType="default"
                    secureTextEntry={false}
                    property='usuario'
                    onChangeText={onChange}
                    value={usuario}
                />

                <CustomTextInput
                    image={require('../../../../assets/img/password.png')}
                    placeholder="Digite sua nova senha"
                    keyboardType="default"
                    secureTextEntry={true}
                    property='novaSenha'
                    onChangeText={onChange}
                    value={novaSenha}
                />

                <CustomTextInput
                    image={require('../../../../assets/img/confirm_password.png')}
                    placeholder="Confirme sua nova senha"
                    keyboardType="default"
                    secureTextEntry={true}
                    property='confirmarSenha'
                    onChangeText={onChange}
                    value={confirmarSenha}
                />

                <View style={{ marginTop: 10 }}>
                    <RoundedButton
                        text='Alterar Senha'
                        onPress={() => alterarSenha()}
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
        height: '55%',
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

export default AlterarSenhaScreen;