import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Transaction } from "@solana/web3.js";
import { Connection, clusterApiUrl } from "@solana/web3.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
export * from "./formatter";

export const onConnectWallet = async () => {
  const { solana }: any = window;

  if (solana) {
    const response = await solana.connect();
    console.log("Connected with Public Key:", response.publicKey.toString());
    return response.publicKey.toString();
  }
  return null;
};

export async function signAndConfirmTransactionFe(
  network: any,
  transaction: any,
  callback: any
) {
  const phantom = new PhantomWalletAdapter();
  await phantom.connect();
  const rpcUrl = clusterApiUrl(network);
  const connection = new Connection(rpcUrl, "confirmed");
  //console.log(connection.rpcEndpoint);
  const ret = await confirmTransactionFromFrontend(
    connection,
    transaction,
    phantom
  );
  console.log(ret);
  connection.onSignature(ret, callback, "finalized");
  return ret;
}

export async function confirmTransactionFromFrontend(
  connection: any,
  encodedTransaction: string,
  wallet: any
) {
  console.log(encodedTransaction);
  const recoveredTransaction = Transaction.from(
    Buffer.from(encodedTransaction, "base64")
  );
  const signedTx = await wallet.signTransaction(recoveredTransaction);
  const confirmTransaction = await connection.sendRawTransaction(
    signedTx.serialize()
  );
  return confirmTransaction;
}

export const convertImageUrlToBlob = async (url: string, fileName: string) => {
  const response = await fetch(url);
  // const contentType = response.headers.get("content-type");
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
