import requests
import json
from datetime import datetime

def fetch_contests():
    contests_url = "https://codeforces.com/api/contest.list"
    problems_url = "https://codeforces.com/api/problemset.problems"

    contests_data = requests.get(contests_url).json()
    problems_data = requests.get(problems_url).json()

    if contests_data["status"] != "OK" or problems_data["status"] != "OK":
        raise Exception("Failed to fetch Codeforces data")

    contests = contests_data["result"]
    problems = problems_data["result"]["problems"]
    problem_stats = problems_data["result"]["problemStatistics"]

    # Map contestId to its problems
    contest_problem_map = {}
    for problem in problems:
        contest_id = problem.get("contestId")
        if contest_id is None:
            continue
        contest_problem_map.setdefault(contest_id, []).append(problem)

    # Map problem stat (solvedCount) to (contestId, index)
    solved_count_map = {
        (p["contestId"], p["index"]): p["solvedCount"]
        for p in problem_stats
    }

    # Function to extract a standardized division name
    def get_division(name):
        if "Div. 1 + Div. 2" in name:
            return "Div. 1 + Div. 2"
        if "Div. 1" in name:
            return "Div. 1"
        if "Div. 2" in name:
            return "Div. 2"
        if "Div. 3" in name:
            return "Div. 3"
        if "Div. 4" in name:
            return "Div. 4"
        if "Educational" in name:
            return "Educational Round"
        if "Global" in name:
            return "Global"
        if "Kotlin" in name:
            return "Kotlin"
        if "CodeTON" in name:
            return "CodeTON"
        if "April Fools" in name:
            return "April Fools"
        if "VK Cup" in name:
            return "VK Cup"
        return "Other"

    processed_contests = []
    for contest in contests:
        if contest["phase"] != "FINISHED":
            continue

        contest_id = contest["id"]
        contest_problems = contest_problem_map.get(contest_id, [])

        # Add solved count and rating to each problem
        for problem in contest_problems:
            key = (problem["contestId"], problem["index"])
            problem["solvedCount"] = solved_count_map.get(key, 0)
            problem["rating"] = problem.get("rating", None)  # ✅ Include rating

        processed_contests.append({
            "id": contest_id,
            "name": contest["name"],
            "div": get_division(contest["name"]),
            "phase": contest["phase"],
            "durationSeconds": contest["durationSeconds"],
            "startTimeSeconds": contest["startTimeSeconds"],
            "problems": contest_problems,
        })

    # Sort by start time descending
    processed_contests.sort(key=lambda x: x["startTimeSeconds"], reverse=True)

    # Save to JSON file
    with open("src/data/contests.json", "w", encoding="utf-8") as f:
        json.dump(processed_contests, f, indent=2)

    print(f"✅ Saved {len(processed_contests)} contests to src/data/contests.json")

if __name__ == "__main__":
    fetch_contests()
