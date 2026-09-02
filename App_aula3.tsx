import React, { useState, useRef } from 'react';
// importação da nova versao do Expo - para dependencias inteligentes
import * as FileSystem from 'expo-file-system/legacy';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
 
// Pegamos a largura e altura da tela do celular para garantir o tamanho da foto
const { width, height } = Dimensions.get('window');

// Variável para controlar o ambiente (true = simula no front / false = envia pro servidor real)
// const isTestMode = true;
// Modo de produção Ativado - false = envia para o servidor real C#
const isTestMode = false;
 
export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setUploading] = useState(false);
  const cameraRef = useRef<any>(null);
 
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.textLight}>Carregando permissões...</Text>
      </View>
    );
  }
 
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginBottom: 10, color: '#fff' }}>
          Precisamos da sua permissão para mostrar a câmera.
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }
 
  const takePicture = async () => {
    if (cameraRef.current) {
      // skipProcessing garante que o Android processe a imagem antes de entregar o URI
      const options = { quality: 0.8, skipProcessing: false };
     
      const photo = await cameraRef.current.takePictureAsync(options);
     
      if (photo && photo.uri) {
        // Isso vai aparecer no seu terminal do VS Code
        console.log("Foto tirada com sucesso! Caminho:", photo.uri);
        setCapturedImage(photo.uri);
      }
    }
  };

  const uploadImage = async () => { 

    if (!capturedImage) return;

    setUploading(true);

    try {
      if(isTestMode) {
        /**
         * MODO DE TESTE (APENAS FRONT-END)
         */
        console.log('Modo de teste ativo: Simulando o Upload...');

        // Simula o tempo de uma requisição de rede "2 segundos"
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Upload simulado com sucesso! A imagem está pronta para ser usada no app.');
        Alert.alert('Sucesso', 'Sua foto de perfil foi atualizada (Modo Teste)!');

        // A partir daqui pode ser utilizada e atualziada a foto na UI, no Context ou Redux

      } else {
        /**
         *  MODO PRODUÇÃO (COMUNICAÇÃO COM BACKEND)
         */

        // Porta: 5262 - vem do servidor C#
        const UPLOAD_URL = 'http://10.0.2.2:5262/api/Usuario/upload-perfil'

        // 1. Passamos o valor '1' diretamente para evitar bugs do TypeScreipt/Explo
        // 0 = BINARY_CONTENT | 1 = MULTIPART
        const response = await FileSystem.uploadAsync(UPLOAD_URL, capturedImage, {
          fieldName: 'profilePicture',
          httpMethod: 'POST', 
          uploadType: 1 });

        if (response.status >= 200 && response.status < 300) {
          const data = JSON.parse(response.body);
          console.log('Upload concluido no servidor: ', data);
          Alert.alert('Sucesso!','A foto de perfil foi salva no servidor C#.');
        }
        else{
          console.error('Erro do servidor: ', response.body);
          Alert.alert('ERRO', 'Nao foi possivel guardar a imagem no servidor.');
        }
      }
    } catch (error) {
      console.error('Erro no upload: ', error);
      Alert.alert('ERRO', 'Falha na conexão com o servidor.');
    } finally {
      setUploading(false); // Esconde o loading, independentemente de dar erro ou sucesso 
    }
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        // Tela de Preview da Foto
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage }}
            style={styles.preview}
            resizeMode="cover" // Garante que a foto preencha o espaço bonito
          />
          <View style={styles.previewButtons}>
            { isUploading ? (
              <ActivityIndicator size='large' color='#00ff00' />
            ) : (
              <>
                <Button title="Usar como foto de Perfil" onPress={uploadImage} color='#28a745' />
                <View style={{ marginTop: 10 }}>
                  <Button title="Tirar outra foto" onPress={() => setCapturedImage(null)} color='#dc3545' />
                </View>
              </>
            )}
          </View>
        </View>
      ) : (
        // Tela da Câmera
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing="front" ref={cameraRef} />
         
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.textBtn}>Tirar Foto</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent:'center',
    backgroundColor: "#000",
  },
  textLight: {
    color:"#fff",
    textAlign:"center",
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    position:'relative',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom:40,
    left: 0,
    right:0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 5,
    borderRadius:30,
  },
  textBtn: {
    fontSize: 16,
    fontWeight:'bold',
    color:'#000',
  },
  previewContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
  },
  preview: {
    // Definindo tamanhos fixos baseado na tela do celular 
    width: width * 0.85,
    height: height * 0.70,
    borderRadius: 12,
  },
  previewButtons: {
    marginTop:20,
    width:'80%',
  },
});
 