import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useFilterStore } from '@/stores/filters'
import { useUserStore } from '@/stores/users'

import Contest from '@/models/Contest'
import Problem from '@/models/Problem'

import contestsJson from '@/data/contests.json'

export const useContestStore = defineStore('contests', () => {
  const filterStore = useFilterStore()
  const { selectedDivisions, participantType } = storeToRefs(filterStore)

  const userStore = useUserStore()
  const { users } = storeToRefs(userStore)

  const contests = computed(() => {
    const contestMap = new Map()

    // Convert JSON to Contest class + wrap problems as Problem instances
    contestsJson
      .filter(c => c.phase === 'FINISHED' && Array.isArray(c.problems))
      .map(c => {
        const contest = new Contest(c)
        contest.problems = c.problems.map(p => new Problem({ ...p, contestId: c.id }))
        return contest
      })
      .sort((a, b) => b.startDate - a.startDate)
      .forEach(c => contestMap.set(c.id, c))

    // Add user submission info
    _addUserAttemptInformation(contestMap)

    // Convert Map to Array
    let filteredContests = Array.from(contestMap.values())

    // Apply filters
    filteredContests = _filterBasedOnDivisions(filteredContests)
    filteredContests = _filterOnParticipantType(filteredContests)

    return filteredContests
  })

  function _filterBasedOnDivisions(contests) {
    if (selectedDivisions.value.length > 0) {
      return contests.filter(c => selectedDivisions.value.includes(c.division))
    }
    return contests
  }

  function _filterOnParticipantType(contests) {
    if (participantType.value === 'contestant') {
      return contests.filter(c => c.isContestant)
    } else if (participantType.value === 'participant') {
      return contests.filter(c => c.isParticipant)
    }
    return contests
  }

  function _addUserAttemptInformation(contestMap) {
    for (const user of users.value) {
      for (const submission of user.submissions) {
        const cid = submission.contestId
        if (!contestMap.has(cid)) continue

        const contest = contestMap.get(cid)
        const handle = user.handle
        const isContestant = submission.author.participantType === 'CONTESTANT'
        const isSolved = submission.verdict === 'OK'

        contest.participants.add(handle)
        if (isContestant) contest.contestants.add(handle)

        for (const problem of contest.problems) {
          if (submission.problem.index === problem.index) {
            const existing = problem.status.get(handle)
            const statusUpdate = { isSolved, inContest: isContestant }

            if (!existing) {
              problem.status.set(handle, statusUpdate)
            } else {
              if (isSolved && !existing.isSolved) {
                existing.isSolved = true
                existing.inContest = existing.inContest || isContestant
              } else if (!isSolved && isContestant) {
                existing.inContest = true
              }
            }
          }
        }
      }
    }
  }

  return { contests }
})
