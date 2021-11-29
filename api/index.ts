import * as solanaWeb3 from '@solana/web3.js';

import * as Random from "expo-random"
import { ethers } from "ethers"
import { Buffer } from "buffer"
import nacl from "tweetnacl"

async function generateMnemonic() {
    const randomBytes = await Random.getRandomBytesAsync(16);
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    return mnemonic
}

const mnemonicToSeed = async (mnemonic: string) => {
    try {
        return ethers.utils.mnemonicToSeed(mnemonic).toString()
    } catch (error) {
        console.log(error);
        return "error"
    }
};

async function createAccount(seed: string) {
    const hex = Uint8Array.from(Buffer.from(seed))
    const keyPair = nacl.sign.keyPair.fromSeed(hex.slice(0, 32));
    const acc = new solanaWeb3.Account(keyPair.secretKey);
    return acc.publicKey.toString()
}

function createConnection() {
    return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"))
}

async function getBalance(publicKey: string) {
    const connection = createConnection()
    return await connection.getBalance(new solanaWeb3.PublicKey(publicKey)).catch((err) => {
        console.log(err);
    })
}


export { generateMnemonic, mnemonicToSeed, createAccount, getBalance }