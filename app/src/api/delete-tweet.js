import { useWorkspace } from '@/composables'
import {PublicKey} from "@solana/web3.js";
import cowsigner from "cowsigner";

export const deleteTweet = async (tweet) => {
    const { wallet, program } = useWorkspace()

    const contractId = process.env.VUE_APP_COWSIGNER_CONTRACT_ID
    let appWallet = new PublicKey(process.env.VUE_APP_COWSIGNER_APP_WALLET);

    let method = program.value.methods.deleteTweet({
        accounts: {
            author: wallet.value.publicKey,
            tweet: tweet.publicKey
        }
    })

    await cowsigner.sendInstruction(method, appWallet, contractId)
}
