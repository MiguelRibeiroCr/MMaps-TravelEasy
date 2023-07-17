import React, { useState, useEffect } from 'react';
import
  { View,Text,TextInput,
    TouchableOpacity,
 StyleSheet,
 TouchableHighlight,
   
  } from 'react-native';
  import { Image } from 'expo-image';


export default function Login({navigation}) {
 

  return (
    
     <View> 
        <Image
          style={styles.img}
          source={{uri:"data:image/png;base64,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"}}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            textContentType="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={() => {}}
          />

          <TouchableHighlight style={styles.buttonSubmit}
          onPress={() => navigation.navigate('HomePage')}
          >
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableHighlight>

    </View>
    
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#191919'
      },
    
      containerLogo: {
        flex: 1,
        justifyContent: 'center'
      },

      form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 25
      },
    
      input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 22,
        borderRadius: 7,
        padding: 10,
        marginHorizontal:20
      },
    
      buttonSubmit: {
        backgroundColor: '#59BFFF',
        width: '40%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal:120
      },
    
      submitText: {
        color: '#FFF',
        fontSize: 19
      },
    
      buttonRegister: {
        marginTop: 10
      },
    
      img:{
        width:'49%',
        height:'35%',
        marginHorizontal:100,
        borderRadius:30,
        margin:60


      }
    });