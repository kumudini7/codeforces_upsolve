<template>
  <header class="w-full bg-blue-700 dark:bg-gray-500 px-5 py-4 shadow-md">
     
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
    
<!-- 🌙 Dark Mode Toggle + Logo -->
<div class="flex items-center gap-4 w-full lg:w-auto">
  <div class="cursor-pointer" @click="toggleDarkMode" title="Toggle Theme">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      :class="isDarkMode ? 'text-yellow-300' : 'text-white'"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.58 9.79z" />
    </svg>
  </div>

  <!-- ✅ Logo and Name -->
  <div class="flex items-center gap-2">
    <img src="src/assets/logo-removebg-preview.png" alt="Logo" class="h-8 w-8" />
    <span class="text-2xl font-bold text-white tracking-wide">&lt;UpSolve-CF /&gt;</span>
  </div>
</div>


<!-- ℹ️ Info Button with Click Toggle -->
<div class="relative ml-auto">
  
  <button @click="toggleInfoBox" title="About This App" class="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-white hover:text-yellow-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
      />
    </svg>
  </button>

  <!-- Info Box -->
  <div
    v-if="showInfo"
    class="absolute right-0 mt-2 w-72 p-4 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg z-50"
  >
    <p class="font-bold text-lg">UpSolve-CF</p>
    <p class="text-sm mt-1">Created by <strong>Kumudini Gholap</strong></p>

  </div>
</div>


      <form
        class="flex flex-col sm:flex-row gap-2 w-full lg:w-auto"
        @submit.prevent="addUsernamesAndClearInput(userInput)"
      >
        <input
          id="userInput"
          ref="userInputRef"
          v-model="userInput"
          class="px-2 border border-gray-300 rounded-md py-1 text-gray-900 focus:outline-none dark:bg-blue-100"
          type="text"
          placeholder="Enter username"
        />
        <button
          class="bg-white font-bold text-blue-900 hover:bg-gray-100 px-1 py-1 rounded-md font-small flex items-center gap-2"
        >
          ➕ Add users
        </button>
        <button
          type="button"
          @click="userStore.removeAllUsers"
          class="bg-slate-200 font-bold hover:bg-slate-300 px-1 py-1 rounded-md font-small flex items-center gap-2 dark:text-black"
        >
          🗑 Remove all
        </button>
      </form>

      <!-- 👥 Active Users -->
      <div v-if="users.length" class="flex flex-wrap gap-2 mt-2 lg:mt-0">
        <div
          v-for="user in users"
          :key="user.handle"
          class="flex items-center gap-1 px-2 py-1 rounded-full border text-sm bg-white dark:border-white"
          :class="user.rank.split(' ').join('-')"
        >
          <img :src="user.avatar" class="h-6 w-6 rounded-full object-cover" />
          <span>{{ user.handle }}</span>
          <button @click="userStore.removeUser(user.handle)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </header>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/users'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const userInput = ref('')
const userInputRef = ref(null)
const isDarkMode = ref(document.documentElement.classList.contains('dark'))
const showInfo = ref(false)

const toggleInfoBox = () => {
  showInfo.value = !showInfo.value
}

const setUserPreferredTheme = () => {
  const userPreference = localStorage.getItem('theme')
  if (userPreference === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else if (userPreference === 'light') {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
}

const toggleDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

const addUsernamesAndClearInput = async (usernames) => {
  userStore.addUser(usernames)
  userInput.value = ''
}

onMounted(() => {
  userInputRef.value?.focus()
})

setUserPreferredTheme()
</script>

<style scoped>
.newbie { color: gray; }
.pupil { color: rgb(136, 204, 34); }
.apprentice { color: green; }
.specialist { color: rgb(3, 168, 158); }
.expert { color: blue; }
.candidate-master { color: rgb(170, 0, 170); }
.master, .international-master { color: rgb(255, 140, 0); }
.international-master::first-letter { color: red; }
.grandmaster, .international-grandmaster, .legendary-grandmaster { color: red; }
.legendary-grandmaster::first-letter { color: black; }
.tourist { color: black; }
.tourist::first-letter { color: red; }
</style>
