<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  tweet: Object,
})

const { tweet } = toRefs(props)

const setLinks = (text) => {
  const Rexp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?=~_|!:,.;]*)[-A-Z0-9+&@#%=~_|])/ig;
  return text.replace(Rexp, "<a href='$1' target='_blank'>$1</a>");
}

</script>

<template>
  <div class="grid grid-rows-12 grid-cols-12 grid-flow-col gap-4">
    <a href="https://twitter.com/Aleebuffoli" target="_blank"  class="row-span-3 col-span-2 sm:col-span-1">
      <img class="rounded-full inline" src="../assets/pixil-frame-0.png" />
    </a>
    <div class="col-span-11">
      <div class="flex justify-between">
        <div class="py-1">
          <a href="https://twitter.com/Aleebuffoli" target="_blank" class="inline font-semibold hover:underline" title="Go To Twitter">
            Alessandro Buffoli
          </a>
          <a href="https://twitter.com/Aleebuffoli" target="_blank" class="inline text-gray-500 hover:underline" title="Go To Twitter">
            @Aleebuffoli
          </a>
          <span class="text-gray-500"> • </span>
          <time class="text-gray-500 text-sm" title="Few seconds ago">
            a few seconds ago
          </time>
        </div>
      </div>
    </div>
    <div class="row-span-2 col-span-11">
      <div v-for="content in tweet.contents" v-bind:key="content.text" :class="content.class" v-html="setLinks(content.text)"></div>
    </div>
  </div>
</template>
