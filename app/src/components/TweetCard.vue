<script setup>
import { ref, toRefs, computed } from 'vue'
import { useWorkspace } from '@/composables'
import { deleteTweet } from '@/api'
import TweetFormUpdate from './TweetFormUpdate'
import { useToast }  from "vue-toastification";
import TweetAdCard from "@/components/TweetAdCard";

const emit = defineEmits(['delete']);
const props = defineProps({
    tweet: Object,
})

const { tweet } = toRefs(props)
const toast=useToast()
const { wallet } = useWorkspace()
const isMyTweet = computed(() => wallet.value && wallet.value.publicKey.toBase58() === tweet.value.author.toBase58())

const isEditing = ref(false)

const onDelete = async () => {
    await deleteTweet(tweet.value).then(()=>{
        emit('delete', tweet.value)
    }).catch(err=>{
        toast(err.message,{type:'error'})
    });

}

let wallets = ref({})

const getColor = (pubkey) => {
  if (Object.prototype.hasOwnProperty.call(wallets.value, pubkey)) {
    return wallets.value[pubkey]
  }

  const colors = ["bg-purple-500", "bg-blue-500", "bg-red-400", "bg-green-700",]

  wallets.value[pubkey] = colors[Math.floor(Math.random() * colors.length)];
  return wallets.value[pubkey]
}

</script>

<template>
    <tweet-form-update v-if="isEditing" :tweet="tweet" @close="isEditing = false"></tweet-form-update>
    <div class="px-4 py-4" v-else>
      <tweet-ad-card v-if="tweet.ad === true" :tweet="tweet"></tweet-ad-card>
      <div v-else class="grid grid-rows-12 grid-cols-12 grid-flow-col gap-4">
        <a class="row-span-3 col-span-2 sm:col-span-1">
          <div class=" w-8 h-8 font-bold text-gray-200 rounded-full flex items-center justify-center font-mono"
            :class="getColor(tweet.author_display)">
            {{ tweet.author_display.slice(0, 2) }}
          </div>
        </a>
        <div class="col-span-11">
          <div class="flex justify-between">
            <div class="py-1">
              <h3 class="inline font-semibold" :title="tweet.author">
                {{ tweet.author_display }}
              </h3>
              <div v-if="tweet.topic && tweet.topic === 'SentWithCowsigner'" class="inline-block mt-4 ml-2 text-gray-500 text-sm">
                <div v-if="tweet.topic === 'SentWithCowsigner'" class="text-gray-500 text-sm">
                  Sent with <a href="https://cowsigner.com" target="_blank" class="text-brandeis-blue-light hover:underline break-all">Cowsigner</a>
                </div>
              </div>
              <div v-else class="inline-block mt-4 ml-2 text-gray-500 text-sm">
                Sent by Paying
              </div>
              <span class="text-gray-500"> • </span>
              <time class="text-gray-500 text-sm" :title="tweet.created_at">
                {{ tweet.created_ago }}
              </time>

            </div>
            <span class="right-0" v-if="isMyTweet">
                <button @click="isEditing = true" class=" px-2 rounded-full text-gray-500 hover:text-brandeis-blue hover:bg-gray-100" title="Update tweet">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 m-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button @click="onDelete" class=" px-2 rounded-full text-gray-500 hover:text-brandeis-blue hover:bg-gray-100" title="Delete tweet">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 m-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </span>
          </div>
        </div>
        <div class="row-span-2 col-span-11">
          <p class="whitespace-pre-wrap break-all" v-text="tweet.content"></p>
        </div>
      </div>
    </div>
</template>
