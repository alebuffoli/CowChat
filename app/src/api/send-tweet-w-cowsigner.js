import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '@/composables'
import { Tweet } from '@/models'
import {PublicKey} from "@solana/web3.js";
import cowsigner from "cowsigner";

export const sendTweetWCowsigner = async (topic, content) => {
    const { wallet, program } = useWorkspace()
    const tweet = web3.Keypair.generate()

    const contractId = process.env.VUE_APP_COWSIGNER_CONTRACT_ID
    let appWallet = new PublicKey(process.env.VUE_APP_COWSIGNER_APP_WALLET);

    let method = await program.value.methods.sendTweet(topic, content, {
        accounts: {
            author: wallet.value.publicKey,
            tweet: tweet.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [tweet]
    });

    const results = await cowsigner.sendInstruction(method, appWallet, contractId)
    console.log(results)


    const tweetAccount = await program.value.account.tweet.fetch(tweet.publicKey, 'recent')
    return new Tweet(tweet.publicKey, tweetAccount)
}
