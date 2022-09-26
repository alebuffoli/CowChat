<script setup>
import { computed, ref, toRefs } from 'vue'
import { useAutoresizeTextarea, useCountCharacterLimit, useSlug } from '@/composables'
import { updateTweet } from '@/api'
import { useWallet } from 'solana-wallets-vue'
import { useToast }  from "vue-toastification";

// Props.
const props = defineProps({
    tweet: Object,
})
const { tweet } = toRefs(props)

// Form data.
const content = ref(tweet.value.content)
const topic = ref(tweet.value.topic)
const slugTopic = useSlug(topic)
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
const emit = defineEmits(['close'])
const update = async () => {
    if (! canTweet.value) return
    await updateTweet(tweet.value, slugTopic.value, content.value).then(()=>{
        emit('close')
    }).catch(err=>{
      console.log(err)
        toast(err.message,{type:'error'})
    })
}
</script>

<template>
    <div v-if="connected">
        <div class="px-8 py-4 border-l-4 border-brandeis-blue">
            <div class="py-1">
                <h3 class="inline font-semibold" :title="tweet.author">
                  {{ tweet.author_display }}
                </h3>
                <span class="text-gray-500"> • </span>
                <time class="text-gray-500 text-sm" :title="tweet.created_at">
                  {{ tweet.created_ago }}
                </time>
            </div>
            
            <!-- Content field. -->
            <textarea
                ref="textarea"
                rows="1"
                class="text-xl w-full focus:outline-none resize-none mb-3  dark:bg-rich-black dark:text-gray-50"
                placeholder="What's happening?"
                v-model="content"
            ></textarea>

            <div class="flex flex-wrap items-center justify-between -m-2">

                <!-- Topic field. -->

                <div class="flex items-center space-x-4 m-2 ml-auto">

                    <!-- Character limit. -->
                    <div :class="characterLimitColour">
                        {{ characterLimit }} left
                    </div>

                    <!-- Close button. -->
                    <button
                        class="text-white px-4 py-2 rounded-full font-semibold border-2 bg-white hover:bg-gray-50 dark:bg-brandeis-blue"
                        @click="emit('close')"
                    >
                        Cancel
                    </button>

                    <!-- Tweet button. -->
                    <button
                        class="text-white px-4 py-2 rounded-full font-semibold dark:bg-brandeis-blue" :disabled="!canTweet"
                        :class="canTweet ? 'bg-brandeis-blue border' : 'bg-brandeis-blue opacity-50 cursor-not-allowed'"
                        @click="update"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="px-8 py-4 bg-gray-50 text-gray-500 dark:bg-rich-black dark:text-gray-50 text-center border-b">
        Connect your wallet to start tweeting...
    </div>
</template>
