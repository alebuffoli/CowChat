<script setup>
import { useRoute } from 'vue-router'
import { onMounted,ref,watch } from 'vue'
import TheSidebar from './components/TheSidebar'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { initWallet,useWallet } from 'solana-wallets-vue'
import { initWorkspace } from '@/composables'
import {useDarkMode} from '@/composables'
import { contractSigner } from '@/api'

const route = useRoute()
const isDark = ref(false)

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
]

initWallet({ wallets, autoConnect: true })
initWorkspace()


onMounted(() => {
  if(localStorage.getItem('color-theme')=="dark"){
    isDark.value=true
  }
  useDarkMode()
})

const { connected } = useWallet()

watch(connected, (newVal) => {
  if(newVal){
    contractSigner();
  }
})


// const toggleDarkMode=()=>{
//     let theme = isDark.value==true?'light':'dark';
//     isDark.value=!isDark.value
//     localStorage.setItem('color-theme', theme);
//     useDarkMode()
// }
</script>

<template>
    <div class="bg-gradient-to-r from-rich-black via-rich-black to-rich-blue text-gray-200">
      <div class="w-full max-w-3xl lg:max-w-3xl mx-auto">
        <the-sidebar class="py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64"></the-sidebar>

        <!-- Main -->
        <main class="min-h-screen sm:border-r sm:border-l ">
          <header class="flex justify-center space-x-6 px-8 py-4 border-b">
<!--            <button @click="toggleDarkMode" type="button" class="rounded-lg text-sm p-2.5">-->
<!--                <svg class="w-5 h-5" v-if="!isDark" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>-->
<!--                <svg class="w-5 h-5" v-else fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>-->
<!--            </button>-->
            <div >
              <a href="https://cowsigner.com" class="inline-block p-3 md:self-start" target="_blank">
                <img style="height:80px" class="ml-2" src="./assets/cowsigner-logo-chat-blue-transparent.png" />
              </a>
              <div class=" flex justify-center text-xl font-bold text-gray-200" v-text="route.name"></div>
            </div>

          </header>
          <router-view></router-view>
        </main>
      </div>
    </div>
</template>
