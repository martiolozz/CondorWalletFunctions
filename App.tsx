import { hexValue } from '@ethersproject/bytes';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { any } from 'superstruct';
import "react-native-url-polyfill/auto";


import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken } from './api';

  

export default function App() { 

  //Funcion de generar 12 palabras
  const [mnemonic, setMnemonic] = useState("")

  function generarMnemonic(){
    const memo = generateMnemonic()
    memo.then((value) => {
      console.log(value);
      setMnemonic(value)
    })
  }

  //Funcion semilla desde 12 palabras
  const [seed, setSeed] = useState("")

  function generarSeed(mnemonic: string) {
    mnemonicToSeed(mnemonic).then((value) => {
      setSeed(value)
    })
  }

  //Funcion para crear cuenta
  const [account, setAccount] = useState("")

  function generarCuenta(seed) {
    createAccount(seed).then((hexValue) => {
      console.log(hexValue)
      setAccount(hexValue)
    })
  }

  
  //Funcion obtener balance
  const [balance, setBalance] = useState(0)

  async function obtenerBalance(publicKey: string) {
    getBalance(publicKey).then((value) => {
      console.log(value)
      setBalance(value)
    }).catch((error) => {
      console.log(error);
      return "error"
    })
  }

  //Funcion de obtener splToken
  const [tokenBalance, setTokenBalance] = useState(0)

  async function obtenerTokenB(publicKey:string, mint:string) {
    const bala = getToken(publicKey, mint).then((value) => {
      setTokenBalance(value)
      console.log(value);
    })
  }

  return (
    <View style={styles.container}>
      <Text>{mnemonic}</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => generarMnemonic()}
      >
        <Text>Generar Mnemonic</Text>
      </TouchableOpacity>
      <Text>{seed}</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => generarSeed(mnemonic)}
      >
        <Text>Generar Semilla</Text>
      </TouchableOpacity>
      <Text>{account}</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => generarCuenta(seed)}
      >
        <Text>Crear Cuenta</Text>
      </TouchableOpacity>
      <Text>{balance}</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => obtenerBalance(account)}
      >
        <Text>Obtener Balance</Text>
      </TouchableOpacity>
      <Text>{tokenBalance}</Text>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => obtenerTokenB(account, "7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ")}
      >
        <Text>Obtener Balance Token</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  boton: {
    marginTop: 50
  }
});
