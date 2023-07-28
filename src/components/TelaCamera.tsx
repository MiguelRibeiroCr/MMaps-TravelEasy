import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Image, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { app } from "../../firebase-config";




export default function CameraPage({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [Permission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [isUploading, setIsUploading]  = useState(false);

  async function uploadImage(imageUrl): Promise<string> {
    setIsUploading(true);
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      'images/' + imageUrl.replace(/^.*[\\\/]/, '')
    );
    const upload = await uploadBytes(storageRef, blob);

    const uploadedImagemUrl = await getDownloadURL(storageRef);
    console.log(uploadedImagemUrl);
    setIsUploading(false);
    return uploadedImagemUrl;
  }



  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      console.log(uri);
      setImage(uri);

      navigation.goBack();
    }

  }

  function toggleCameraType() {
    setCameraType((prevType) =>
      prevType === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(l) => setCamera(l)}
        style={styles.styleCamera}
        type={cameraType}
        ratio={"1:1"}
      >
        {
        isUploading ?
        <View style={{
          width:'100%',
          height:'100%',
          backgroundColor: 'black',
          opacity:0.8,
          justifyContent: "center",
          alignItems:'center'

        }}>

          <Image style={{width:100, height:80}}
            source={{uri:'https://i.gifer.com/ZZ5H.gif'}}/>
            <Text style={{color: 'white'}}> Aguarde...</Text>
            </View>:<></>
      }
      </Camera>

      
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={takePicture}
        >

          <MaterialIcons name="camera-alt" size={34} color="black" />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={() => toggleCameraType()}
        >
          <AntDesign name="retweet" size={24} color="black" />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleCamera: {
    aspectRatio: 1,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#1919",
    elevation: 5,
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 100,
    marginHorizontal: 8,
  },
});