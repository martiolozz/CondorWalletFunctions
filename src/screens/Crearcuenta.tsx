import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';

const Crearcuenta = () => {

    const [words, setWords] = useState('')

    function generarMnemonic(){
        const memo = generateMnemonic()
        memo.then((value) => {
          console.log(value);
          setWords(value)
        })
      }


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{words}</Text>
            <TouchableOpacity
                style={styles.boton}
                onPress={() => generarMnemonic()}
            >
                <Text style={styles.textoBoton}>Generar 12 palabras</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Crearcuenta

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 25,
        margin: 40
    },
    boton: {
        backgroundColor: 'purple',
        width: '80%',
    },
    textoBoton: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    }
})
