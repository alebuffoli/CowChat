<script setup>
import { computed, ref, toRefs } from 'vue'
import { useAutoresizeTextarea, useCountCharacterLimit } from '@/composables'
import { sendTweetWCowsigner, sendTweet } from '@/api'
import { useWallet } from 'solana-wallets-vue'
import { useToast }  from "vue-toastification";


// Props.
const props = defineProps({
    forcedTopic: String,
    showError: Boolean
})
const { showError } = toRefs(props)

// Form data.
const content = ref('')
const topic = ref('')
const toast=useToast()
// Auto-resize the content's textarea.
const textarea = ref()
useAutoresizeTextarea(textarea)

// Character limit / count-down.
const characterLimit = useCountCharacterLimit(content, 280)
const characterLimitColour = computed(() => {
    if (characterLimit.value < 0) return 'text-red-500'
    if (characterLimit.value <= 10) return 'text-yellow-500'
    return 'text-gray-400'
})

// Permissions.
const { connected } = useWallet()
const canTweet = computed(() => content.value && characterLimit.value > 0)

// Actions.
const emit = defineEmits(['added'])
const sendWithCowsigner = async () => {
  if (! canTweet.value) return

  await sendTweetWCowsigner('SentWithCowsigner', content.value).then(tweet =>{
    emit('added', tweet)
    topic.value = ''
    content.value = ''
  }).catch(err=>{
    toast(err.message,{type:'error'})
  })
}

const send = async () => {
  if (! canTweet.value) return
    await sendTweet('PaidToSend', content.value).then(tweet => {
      emit('added', tweet)
      topic.value = ''
      content.value = ''
    }).catch(err => {
      showError.value = true
      console.log(err.message)
      if (err.message === 'failed to send transaction: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x1') {
        toast("Insufficient founds!\nYou need 0.0105 SOL to send the transaction.",{type:'error'})
      } else {
        toast("Insufficient founds!\nYou need 0.0105 SOL to send the transaction.",{type:'error'})
        toast(err.message,{type:'error'})
      }
    })

}
</script>

<template>
    <div v-if="connected" class="py-4 border-b">
      <div class="flex">
        <div class="w-full border border-gray-200 rounded-lg p-1 my-1 mx-4">
          <textarea
              ref="textarea"
              rows="1"
              class="text-xl w-full p-2 focus:outline-none resize-none mb-3 bg-transparent dark:text-gray-50"
              placeholder="What's happening?"
              v-model="content"
          ></textarea>
          <div class="flex">
            <div class="relative m-2 mr-4">
            </div>
            <div class="ml-auto mt-auto mr-2" :class="characterLimitColour">
              {{ characterLimit }} left
            </div>
          </div>
        </div>
        <div class="px-0 mt-2 mr-4 hidden sm:block">
          <button
              class="text-white px-4 py-2 pl-6 w-full rounded-full font-semibold text-center inline-flex" :disabled="! canTweet"
              :class="canTweet ? 'bg-brandeis-blue border' : 'bg-brandeis-blue opacity-50 cursor-not-allowed'"
              style="width: 185px"
              @click="sendWithCowsigner"
          >
            Send for free
            <img style="height:25px" class="ml-2" src="../assets/solo-logo-white.png" />
          </button>
          <p class="text-gray-400 text-center my-2">
            or
          </p>
          <button
              class="text-white px-4 py-2 rounded-full font-semibold " :disabled="! canTweet"
              :class="canTweet ? 'bg-red-500 border border-red-400' : 'bg-red-500 opacity-50 cursor-not-allowed'"
              style="width: 180px"
              @click="send"
          >
            Send
          </button>
        </div>
      </div>
      <div class="flex mt-3 ml-3 block sm:hidden">
        <!-- Tweet button. -->
        <button
            class="text-white px-4 py-2 pl-6  rounded-full font-semibold text-center inline-flex" :disabled="! canTweet"
            :class="canTweet ? 'bg-brandeis-blue border' : 'bg-brandeis-blue opacity-50 cursor-not-allowed'"
            @click="sendWithCowsigner"
        >
          Send for free
          <img style="height:25px" class="ml-2" src="../assets/solo-logo-white.png" />

        </button>
        <p class="text-gray-400 text-center mx-3 mt-2">
          or
        </p>
        <button
            class="text-white px-4 py-2 rounded-full font-semibold " :disabled="! canTweet"
            :class="canTweet ? 'bg-red-500 border border-red-400' : 'bg-red-500 opacity-50 cursor-not-allowed'"
            style="width: 120px"
            @click="send"
        >
          Send
        </button>
      </div>
    </div>

    <div v-else class="px-8 py-4 bg-gray-50 text-gray-500 dark:bg-rich-black dark:text-gray-50 text-center border-b">
        Connect your wallet to start tweeting...
    </div>
</template>
