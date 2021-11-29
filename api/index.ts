import * as solanaWeb3 from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from '@solana/web3.js';

import * as Random from "expo-random"
import { ethers } from "ethers"
import { Buffer } from "buffer"
import nacl from "tweetnacl"

//variables
const SPL_TOKEN = "7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ"
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new solanaWeb3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")

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

async function findAssociatedTokenAddress(
    walletAddress: PublicKey,
    tokenMintAddress: PublicKey
  ): Promise<PublicKey> {
    return (
      await solanaWeb3.PublicKey.findProgramAddress(
        [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
      )
    )[0];
  }

async function getToken(publicKey: string, splToken: string){
    const connection = createConnection();

  const account = await findAssociatedTokenAddress(new PublicKey(publicKey), new PublicKey(splToken)
  );

  try {
    const balance = await connection.getTokenAccountBalance(
      new PublicKey(account.toString())
    );
    return balance.value.amount;
  } catch (e) {
    return 0;
  }
}

export { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken }