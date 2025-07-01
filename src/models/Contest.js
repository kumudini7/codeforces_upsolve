import Problem from '@/models/Problem'

export default class Contest {
  constructor(contest) {
    this.id = contest.id;
    this.name = contest.name;
    this.link = `https://codeforces.com/contest/${contest.id}`;
    this.division = contest.div || this._inferDivision(contest.name);  // ✅ FIX HERE
    this.durationSeconds = contest.durationSeconds;
    this.startDate = new Date(contest.startTimeSeconds * 1000);
    this.active = false;
    this.passive = false;

    this.contestants = new Set();
    this.participants = new Set();
    this.problems = [];
    this._addProblems(contest.problems);
  }

  _addProblems(problems) {
    if (problems == undefined) return;
    problems.sort((a, b) => a.index.localeCompare(b.index));
    problems.forEach(problem => this.addProblem(problem));
  }

  addProblem(problem) {
    this.problems.push(new Problem(problem));
  }

  get isContestant() {
    return this.contestants.size > 0;
  }

  get isParticipant() {
    return this.participants.size > 0;
  }

  _inferDivision(name) {
    if (name.includes("Div. 1 + Div. 2")) return "Div. 1 + Div. 2";
    if (name.includes("Div. 1")) return "Div. 1";
    if (name.includes("Div. 2")) return "Div. 2";
    if (name.includes("Div. 3")) return "Div. 3";
    if (name.includes("Div. 4")) return "Div. 4";
    if (name.includes("Global")) return "Global";

    return "Other";
  }
}
