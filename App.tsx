import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import GaleriaScreen from "./scr/Presentation/components/GaleriaScreen";

export default function App() {
    return(
        // SafeAreaView garante que o contúdo não fique embaixo da barra de status ou do 'notch' do celular
        <SafeAreaView style={styles.container}>
            {/* Configura a barra de status do topo para combinar com o tema escuro */}

            <StatusBar barStyle="light-content" backgroundColor='#121212'/>

            {/* Rederiza a nossa tela de capitura de imagem com o tema  */}

            <GaleriaScreen/>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    }
});