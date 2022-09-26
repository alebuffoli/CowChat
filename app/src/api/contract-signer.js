import { useWorkspace } from '@/composables'
import cowsigner from "cowsigner";

export const contractSigner = async () => {
    const { wallet } = useWorkspace();

    const apikey = process.env.VUE_APP_COWSIGNER_API_KEY
    const contractId = process.env.VUE_APP_COWSIGNER_CONTRACT_ID
    const accountId = process.env.VUE_APP_COWSIGNER_ACCOUNT_ID

    await cowsigner.addSignerToContract(
        apikey,
        wallet.value.publicKey,
        contractId,
        accountId
    )
}
