import * as solanaWeb3 from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { PublicKey } from '@solana/web3.js';

import * as Random from "expo-random"
import { ethers } from "ethers"
import { Buffer } from "buffer"
import nacl from "tweetnacl"

//variables
const SPL_TOKEN = "7TMzmUe9NknkeS3Nxcx6esocgyj8WdKyEMny9myDGDYJ"
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new solanaWeb3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")
const LAMPORTS_PER_SOL = solanaWeb3.LAMPORTS_PER_SOL

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
    return acc
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

async function sendTokenTransaction(wallet: solanaWeb3.Account, toPublic: string, splToken: string, amount: number) {
  const connection = createConnection()
  const DEMO_WALLET_SECRET_KEY = new Uint8Array(wallet.secretKey)
  const fromWallet = wallet
  const toWallet = new solanaWeb3.PublicKey(toPublic)
  const myMint = new solanaWeb3.PublicKey(splToken)

  var myToken = new Token(
    connection,
    myMint,
    TOKEN_PROGRAM_ID,
    fromWallet
  );

   // Create associated token accounts for my token if they don't exist yet
   var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  )
  var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    new solanaWeb3.PublicKey(toPublic)
  )

  var transaction = new solanaWeb3.Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        amount * LAMPORTS_PER_SOL
      )
    )
  
    var signature = await solanaWeb3.sendAndConfirmTransaction(
      connection,
      transaction,
      [fromWallet]
    );
    console.log("SIGNATURE", signature);
    console.log("SUCCESS");
  
}

export { generateMnemonic, mnemonicToSeed, createAccount, getBalance, getToken,sendTokenTransaction }