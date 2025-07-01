<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/users'
import { useFilterStore } from '@/stores/filters'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)

const filterStore = useFilterStore()
const { selectedDivisions, participantType } = storeToRefs(filterStore)

const divisionFilters = [
  { name: 'Div. 1', value: 'Div. 1', id: 'div1' },
  { name: 'Div. 2', value: 'Div. 2', id: 'div2' },
  { name: 'Div. 3', value: 'Div. 3', id: 'div3' },
  { name: 'Div. 4', value: 'Div. 4', id: 'div4' },
  { name: 'Div. 1 + Div. 2', value: 'Div. 1 + Div. 2', id: 'div1And2' },
  { name: 'Global', value: 'Global', id: 'global' }
]
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-900 px-6 py-4 shadow-sm">
    <!-- Division Filters -->
    <div class="flex flex-wrap gap-4 justify-start items-center mb-4">
      <div
        v-for="divFilter in divisionFilters"
        :key="divFilter.id"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :id="divFilter.id"
          :value="divFilter.value"
          v-model="selectedDivisions"
          class="form-checkbox text-blue-600"
        />
        <label :for="divFilter.id" class="text-sm text-gray-800 dark:text-gray-200">{{ divFilter.name }}</label>
      </div>
    </div>

    <!-- Participant Type Radio Filters -->
    <div v-if="users.length" class="flex flex-wrap gap-6 items-center">
      <div class="flex items-center gap-2">
        <input
          type="radio"
          id="all"
          name="whichContests"
          value="any"
          v-model="participantType"
          class="form-radio text-blue-600"
        />
        <label for="all" class="text-sm text-gray-800 dark:text-gray-200">All</label>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="radio"
          id="contestant"
          name="whichContests"
          value="contestant"
          v-model="participantType"
          class="form-radio text-blue-600"
        />
        <label for="contestant" class="text-sm text-gray-800 dark:text-gray-200">Contests Participated</label>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="radio"
          id="participant"
          name="whichContests"
          value="participant"
          v-model="participantType"
          class="form-radio text-blue-600"
        />
        <label for="participant" class="text-sm text-gray-800 dark:text-gray-200">Attempted Any</label>
      </div>
    </div>
  </div>
</template>
