<script setup>
import { ref, computed } from 'vue'
import ContestsData from '@/data/contests.json'
import ProblemCard from '@/components/ProblemCard.vue'

// Search input
const searchTerm = ref('')

// Ensure contests data is an array
const contests = ref(Array.isArray(ContestsData) ? ContestsData : [])

// Flatten all problems with context
const allProblems = computed(() =>
  contests.value.flatMap(contest =>
    (contest.problems || []).map(problem => ({
      ...problem,
      contestName: contest.name || 'Unknown Contest',
      contestId: contest.id,
    }))
  )
)

// Filter problems by search
const problemSet = computed(() => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) return allProblems.value

  return allProblems.value.filter(problem =>
    problem.name?.toLowerCase().includes(term) ||
    problem.contestName?.toLowerCase().includes(term) ||
    (problem.tags || []).some(tag => tag.toLowerCase().includes(term)) ||
    (problem.rating && problem.rating.toString().includes(term))
  )
})
</script>

<template>
  <!-- Search Input -->
  <div class="p-4 bg-white border-b">
    <div class="relative">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search problems..."
        class="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>

  <!-- Problems Grid -->
  <div class="flex-1 p-4 overflow-y-auto">
    <div v-if="problemSet.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <ProblemCard
        v-for="problem in problemSet"
        :key="`${problem.contestId}-${problem.index}`"
        :problem="problem"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center text-gray-500 mt-8">
      No problems found.
    </div>
  </div>
</template>
