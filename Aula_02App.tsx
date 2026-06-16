import React, { useState, useEffect, use } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';

export default function App() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function buscaLocalizacao() {
            try {
                // Pede permissão ao usuário
                let { status } = await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    setErrorMsg('Permissão para acessar a localização foi negada!');
                    setLoading(false);
                    return;
                }

                // Busca a ultima posição salva (é instantâneo e evita load eterno do emulador)
                let currentLocation = await Location.getLastKnownPositionAsync(({}));

                if (!currentLocation) {
                    currentLocation = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Lowest,

                    });
                }

                setLocation(currentLocation);
            } catch (error) {
                setErrorMsg('Erro ao tentar buscar a localização!')
            } finally {
                setLoading(false);
            }
        }

        buscaLocalizacao();
    }, []);

    // Mostra um aviso se der erro ou permissão negado
    if (errorMsg) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        );
    }

    // Mostra o loading enquanto tenta achar as coordenadas
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='#0000ff' />
                <Text style={styles.text}>Buscando satélites...</Text>
            </View>
        );
    }

    // Deu certo! Mostra as coordenadas na tela
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sua localização</Text>
            <View style={styles.card}>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Latitude:</Text> {location?.coords.latitude}
                </Text>

                <Text style={styles.text}>
                    <Text style={styles.bold}>Longitude:</Text> {location?.coords.longitude}
                </Text>

                <Text style={styles.text}>
                    <Text style={styles.bold}>Precisão:</Text> {location?.coords.accuracy?.toFixed(2)} metros
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },

    title: {

    },

    card: {

    },

    text: {

    },

    errorText: {

    },

    bold: {
        
    },
});