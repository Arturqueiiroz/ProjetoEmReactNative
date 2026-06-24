import React, { useState, useRef} from "react";
import {StyleSheet, View, Text, TouchableOpacity, Button, Image, Dimensions} from "react-native";
import { CameraView, useCameraPermissions} from "expo-camera";

// Pegamos a largura e altura da tela do dispositivo SmathPhone, para garantir o tamanho da foto

const { width, height} = Dimensions.get('window');

export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const cameraRef = useRef<any>(null);

    if(!permission) {
        return(
            <View style={ styles.container }>
                <Text style={ styles.textLight }> 
                    Carregando permissões...
                </Text>
            </View>
        )
    }

    if(!permission.granted) {
        return(
            <View style={ styles.container}>
                <Text style= {{ textAlign: 'center', marginBottom: 10, color:'#fff'}}>
                    Precisamos da sua permissão para mostrar a câmera!
                </Text>
                <Button
                    onPress={requestPermission}
                    title="Conceder Permissão"
                />
            </View>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            // skipProcessing garante que o Android processe a imagem antes de entregar o URI
            const option = { quality: 0.8, skipProcessing: false};
            const photo = await cameraRef.current.takePictureAsync(option);

            if (photo && photo.uri) {
                console.log('Foto tirada com sucesso! Caminho: ', photo.uri);
                setCapturedImage(photo.uri);
            }
        }
    };

    return(
        <View style={ styles.container}>
            {capturedImage ? (
                // Tela de preview da foto
                <View style={ styles.previewContainer }>
                    <Image
                        source={{ uri: capturedImage}}
                        style= {styles.preview}
                        resizeMode="cover" // Garante que a foto preencha o espaçp total do SmartPhone
                    />
                    <View style= {styles.previewButtons}>
                        <Button
                            onPress={() => setCapturedImage(null)}
                            title="Tirar outra foto!"                        
                        />
                    </View>
                </View>
            ) : (
                // Tela da Câmera
                <View style= {styles.cameraContainer}>
                    <CameraView style= {styles.camera} facing="front" ref={cameraRef} />
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={takePicture}
                        >
                            <Text style={styles.textBtn}> Tirar Foto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: "#000"
    },
    textLight:{
        color: "#FFF",
        textAlign: "center"
    },
    previewContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    preview: {
        // Definir tamanhos fixos baseado na tela do celular
        width: width * 0.85,
        height: height * 0.70,
        borderRadius: 12,
    },
    previewButtons:{
        marginTop: 20,
        width:'80%'
    },
    
    buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    },
    cameraContainer:{
        flex: 1,
        width: '100%',
        position: 'relative'
    },
    camera:{
        flex: 1,
        width: '100%',
    },
    button:{
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        elevation: 5,
        borderRadius: 30
    },
    textBtn:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
});