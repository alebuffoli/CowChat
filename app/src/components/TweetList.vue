<script setup>
import { computed, toRefs } from 'vue'
import TweetCard from '@/components/TweetCard'

const emit = defineEmits(['update:tweets', 'more'])
const props = defineProps({
    tweets: Array,
    loading: Boolean,
    hasMore: Boolean,
    timestamp: Number
})


const { tweets, loading, hasMore, timestamp } = toRefs(props)

const tweet_ad_1 = {
  'ad': true,
  'key': 'ad',
  "timestamp": Math.round(timestamp.value / 1000),
  "contents": [
    {"text" : "Use the blockchain as you have never done before!", "class": ""},
    {"text" : "Type something and click \"Send for Free\"  🚀", "class": "my-3"},
  ]
}

const tweet_ad_2 = {
  'ad': true,
  'key': 'ad',
  "timestamp": Math.round(timestamp.value / 1000),
  "contents": [
    {"text" : "You may non know it, but to carry out any action on the blockchain you have to pay.", "class": ""},
    {"text" : "This application powered by Cowsigner, lets you use the blockchain without having to spend a penny!", "class": "mt-3"},
    {"text" : "Think of the potential, you can carry out any action without having credit on your wallet 🤯 ", "class": "mt-3"},
  ]
}

const tweet_ad_3 = {
  'ad': true,
  'key': 'ad',
  "timestamp": Math.round(timestamp.value / 1000),
  "contents": [
    {"text" : "Here is a video showing you how this DApp works:", "class": ""},
    {"text" : "https://cowsigner.com/#start", "class": "underline text-blue-400"},
    {"text" : "For everything else, you can find informations here:", "class": "mt-3"},
    {"text" : "https://cowsigner.com", "class": "underline text-blue-400"},
    {"text" : "", "class": "my-3"},
    {"text" : "See you soon! 👋", "class": ""},
  ]
}

const orderedTweets = computed(() => {
  console.log('new tweets')
  let t = tweets.value.slice()
  t.push(tweet_ad_1, tweet_ad_2, tweet_ad_3)
  return t.sort((a, b) => b.timestamp - a.timestamp)

})

const onDelete = deletedTweet => {
    const filteredTweets = tweets.value.filter(tweet => tweet.publicKey.toBase58() !== deletedTweet.publicKey.toBase58())
    emit('update:tweets', filteredTweets)
}

</script>


<template>
    <div class="divide-y">
<!--        <tweet-ad-card></tweet-ad-card>-->
        <tweet-card v-for="tweet in orderedTweets" :key="tweet.key" :tweet="tweet" @delete="onDelete"></tweet-card>
        <div v-if="loading" class="p-8 text-gray-500 text-center">
            Loading...
        </div>
        <div v-else-if="hasMore" class="p-8 text-center">
            <button @click="emit('more')" class="dark:bg-brandeis-blue px-4 py-2 rounded-full border bg-gray-50 hover:bg-gray-100 text-white-100">
                Load more
            </button>
        </div>
    </div>
</template>
