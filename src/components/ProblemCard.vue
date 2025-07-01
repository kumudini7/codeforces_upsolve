<script setup>
defineProps({
  problem: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="p-4 bg-white rounded-lg shadow border" v-if="problem">
    <!-- Problem title with link -->
    <h3 class="text-base font-semibold mb-2">
      <a
        :href="problem.link"
        target="_blank"
        class="hover:underline text-blue-600"
      >
        {{ problem.index }}. {{ problem.name }}
      </a>
      <span class="text-gray-500">
        ({{ problem.rating ?? 'Unrated' }}) [{{ problem.solvedCount?.toLocaleString?.() ?? '0' }}]
      </span>
    </h3>

    <!-- Status badge -->
    <div class="text-xs mb-2">
      <span
        v-if="problem.isSolved"
        class="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 mr-2"
      >
        ✅ Solved
      </span>
      <span
        v-else-if="problem.isAttempted"
        class="inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 mr-2"
      >
        ⚠️ Attempted
      </span>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2" v-if="problem.tags?.length">
      <span
        v-for="tag in problem.tags"
        :key="tag"
        class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
