const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

const web3 = require("@solana/web3.js");
const connection = new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
const userWallet = web3.Keypair.generate();
const publicKey = new PublicKey(userWallet._keypair.publicKey).toString();
const secretKey = userWallet._keypair.secretKey;

const airDropSol = async () => {
    try {
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(userWallet.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        console.log(`   Airdropping 2 SOLs...`)
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`Wallet balance of ${publicKey} is: ${parseInt(walletBalance)/LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};


const transferSOL=async (from,to,transferAmt)=>{
    try{
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey:new web3.PublicKey(from.publicKey.toString()),
                toPubkey:new web3.PublicKey(to.publicKey.toString()),
                lamports:transferAmt * web3.LAMPORTS_PER_SOL
            })
        )
        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    }catch(err){
        console.log(err);
    }
}

module.exports={
    getWalletBalance,
    transferSOL,
    airDropSol
}