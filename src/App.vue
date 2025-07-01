<script setup>
import { ref, onMounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

import ContestView from '@/views/ContestView.vue'
import NavigationBar from '@/components/NavigationBar.vue'

const showNewFeatures = ref(false)

onMounted(() => {
  setInterval(() => {
    const log = JSON.parse(localStorage.getItem('activityLog')) || {}
    let missed = 0
    for (let i = 1; i <= 2; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const key = date.toISOString().split('T')[0]
      if (!log[key]) missed++
    }

    if (missed >= 2) {
      alert('⏰ You’ve missed 2+ days! Time to upsolve!')
    }
  }, 1000 * 60 * 60 * 6) // every 6 hours
})
</script>

<template>
  <NavigationBar />

  <main>
    <RouterView />
  </main>
</template>
