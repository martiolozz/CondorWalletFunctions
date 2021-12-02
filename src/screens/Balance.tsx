import React, { useState } from 'react'
import { ImageBackground,StyleSheet, Text, View,TouchableOpacity, Image,Button , Alert } from 'react-native'
import { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction } from '../../api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Hoverable, ScrollView } from "react-native-web-hover";
import { TextInput } from 'react-native-element-textinput';

const Balance = () => {

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

    //obtener balance de una llave publica
    obtenerBalance("uja3w9XG1g6DQSVT6YASK99FVmdVwXoHVoQEgtEJdLv")

    //value textinput


    return (
        <View style={styles.body}>
            <ImageBackground source={require('./img/fondo.png')} style={styles.fondo} >
                <View style={styles.containeruno}>
                    <Image style={styles.logo} source={require('./img/logoblanco.png')}  />
                    {/* Balance */}
                    <Text style={styles.txtbalance}>$ {balance}...</Text>
                    {/* Balance inferior */}
                    <View style={styles.doscolumnasB} >
                        <View style={styles.columnaunoB}>
                            <Text style={styles.txtinferiorL}>+0.00</Text>
                        </View>
                        <View style={styles.columnadosB}>
                            <Text style={styles.txtinferiorR}>0%</Text>
                        </View>
                    </View>
                    {/* Enviar y recibir */}
                    <View style={styles.dcER}>
                        <View style={styles.dcR}>
                            <TouchableOpacity style={styles.btnR}  activeOpacity={0.9}>
                                <Text style={styles.textbtnR}>RECIBIR</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dcE}>
                            <TouchableOpacity style={styles.btnR} activeOpacity={0.9}>
                                <Text style={styles.textbtnR}>ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Balance cryptos */}
                    <View style={styles.balancecry}>
                        <View style={styles.tablacry} >
                            <View style={styles.logocry}>
                                <Image style={styles.imgcry} source={require('./img/billeteras/logocondor.png')}  />
                            </View>
                            <View style={styles.nombrecry}>
                                <Text style={styles.ntxtcry}>CONDORCOIN</Text>
                            </View>
                            <View style={styles.smcry}>
                                <View style={styles.saldocry}>
                                    <Text style={styles.stxtcry}>1000</Text>
                                </View>
                                <View style={styles.monedacry}>
                                    <Text style={styles.mtxtcry}>CNDR</Text>
                                </View>
                            </View>                           
                        </View>
                        

                        <View style={styles.tablacry} >
                            <View style={styles.logocry}>
                                <Image style={styles.imgcry} source={require('./img/billeteras/solana.png')}  />
                            </View>
                            <View style={styles.nombrecry}>
                                <Text style={styles.ntxtcry}>SOLANA</Text>
                            </View>
                            <View style={styles.smcry}>
                                <View style={styles.saldocry}>
                                    <Text style={styles.stxtcry}>2000</Text>
                                </View>
                                <View style={styles.monedacry}>
                                    <Text style={styles.mtxtcry}>SOL</Text>
                                </View>
                            </View>                           
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
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    txtbalance:{
        fontFamily:'Roboto',
        fontSize:RFPercentage(5),
        color:'white',
        fontWeight:'bold',
    },
    doscolumnasB:{
        flexDirection: 'row',
        width:'100%',
    },
    columnaunoB: {
        width:'50%',
        alignItems:'flex-end',
    },
    columnadosB: {
        alignItems:'flex-start',
        width:'50%',
    },
    txtinferiorL:{
        fontFamily:'Roboto',
        color:'white',
        fontSize:RFPercentage(3),
        fontWeight:'bold',
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    txtinferiorR:{
        fontFamily:'Roboto',
        color:'white',
        fontSize:RFPercentage(3),
        fontWeight:'bold',
        backgroundColor:'#923085',
        paddingLeft: '3%',
        paddingRight: '3%',
        borderRadius: 10,
    },
    dcER:{
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: '5%',
    },
    dcR:{
        fontFamily:'Roboto',
        width:'50%',
    },
    dcE:{
        fontFamily:'Roboto',
        width:'50%',
    },
    btnR:{
        backgroundColor:'#5b298a',
        alignItems:'center',
        marginRight: '10%',
        marginLeft: '10%',
        paddingTop: '8%',
        paddingBottom: '8%',
        borderRadius: 20,
    },
    textbtnR:{
        color:'white',
        fontWeight: 'bold',
        fontSize:RFPercentage(2),
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
    tablacry:{
        marginTop:'4%',
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
        borderRadius:10,
        height: '5.8%',
        flexDirection:'row',
        paddingLeft:'2.5%',
        paddingRight:'3.5%',
        paddingTop:'0%'
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
export default Balance