import React, { useState } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert } from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
import { TextInput } from 'react-native-element-textinput';

const Home = () => {
    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    <Image style={styles.logo} source={require('./img/logoblanco.png')}  />
                    {/* Botones*/}
                    <View style={styles.botonesCI}>
                        <View>
                            <TouchableOpacity style={styles.btnC}  activeOpacity={0.9}>
                                <Text style={styles.textCI}>CREAR CUENTA</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnI}  activeOpacity={0.9}>
                                <Text style={styles.textCI}>IMPORTAR</Text> 
                            </TouchableOpacity>           
                        </View>                
                    </View>
                </View>             
            </ImageBackground>   
        </View>
    )
}


const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    containeruno:{
        paddingTop: '8%',
        paddingLeft: '5%',
        paddingRight: '4%',
        alignItems:'center',
    },
    fondo:{
        flex: 1,
        resizeMode:'contain',
    },
    logo:{
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    botonesCI:{
        backgroundColor:'white',
        width: '100%',
        height: '100%',
        marginTop: '3%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: '2%',
        paddingTop: '50%',        
    },
    btnC:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '2%',
        paddingBottom: '2%',
        borderRadius: 20,
    },
    btnI:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginTop:'5%',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '2%',
        paddingBottom: '2%',
        borderRadius: 20,
    },
    textCI:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(4),
    },
    balancecry:{
        backgroundColor:'white',
        width: '100%',
        height: '100%',
        marginTop: '3%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: '2%',
    },
    logocry:{
        width:'15%',
        justifyContent: 'center',
    },
    imgcry:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    nombrecry:{
        width:'45%',
        justifyContent: 'center',
        paddingLeft: '2%'
    },
    ntxtcry:{
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize:RFPercentage(2.3),
        color: '#8d8c8c',
    },
    smcry:{
        width:'40%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    saldocry:{
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    stxtcry:{
        fontFamily: 'Roboto',
        fontSize:RFPercentage(3),
        color: '#8d8c8c',
    },
    monedacry:{
        justifyContent: 'center',
    },
    mtxtcry:{
        fontFamily: 'Roboto',
        fontSize:RFPercentage(1.8),
        color: '#8d8c8c',
    },
})
export default Home