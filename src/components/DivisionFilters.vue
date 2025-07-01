<script setup>
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filters'

const filterStore = useFilterStore()
const { selectedDivisions, participantType } = storeToRefs(filterStore)

const divisionFilters = [
  { name: 'Div. 1', value: 'Div. 1' },
  { name: 'Div. 2', value: 'Div. 2' },
  { name: 'Div. 3', value: 'Div. 3' },
  { name: 'Div. 4', value: 'Div. 4' },
  { name: 'Div. 1 + Div. 2', value: 'Div. 1 + Div. 2' },
  { name: 'Global', value: 'Global' }
]
</script>
<template>
  <div class="w-full bg-white dark:bg-gray-800 rounded-lg shadow px-6 py-6">
    
    <!-- Division Checkboxes -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full text-lg font-semibold">
      <div
        v-for="filter in divisionFilters"
        :key="filter.value"
        class="flex items-center space-x-2 justify-start w-full"
      >
        <input
          type="checkbox"
          :value="filter.value"
          v-model="selectedDivisions"
          class="w-5 h-5 text-blue-600 border-gray-300 rounded"
        />
        <label class="text-gray-800 dark:text-gray-100">
          {{ filter.name }}
        </label>
      </div>
    </div>

    <!-- Participant Radio -->
    <div class="flex flex-wrap gap-6 mt-6 justify-center text-lg font-semibold">
      <label class="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
        <input type="radio" value="any" v-model="participantType" /> <span>All</span>
      </label>
      <label class="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
        <input type="radio" value="contestant" v-model="participantType" /> <span>Contests Participated</span>
      </label>
      <label class="flex items-center space-x-2 text-gray-800 dark:text-gray-100">
        <input type="radio" value="participant" v-model="participantType" /> <span>Attempted Any</span>
      </label>
    </div>
  </div>
</template>

