import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/users'

const DEFAULT_PARTICIPANT = 'any'

export const useFilterStore = defineStore('filter', () => {
  const userStore = useUserStore()
  const { users } = storeToRefs(userStore)

  const selectedDivisions = ref([])
  const participant = ref(DEFAULT_PARTICIPANT)

  const participantType = computed({
    get() {
      if (users.value.length > 0) {
        return participant.value
      }
      return DEFAULT_PARTICIPANT
    },
    set(newValue) {
      participant.value = newValue
    }
  })

  // ✅ Add this function to toggle division selections
  function toggleDivision(division) {
    const index = selectedDivisions.value.indexOf(division)
    if (index >= 0) {
      selectedDivisions.value.splice(index, 1) // Remove
    } else {
      selectedDivisions.value.push(division) // Add
    }
  }

  return {
    selectedDivisions,
    participantType,
    toggleDivision  // ✅ Make sure this is exported
  }
})
