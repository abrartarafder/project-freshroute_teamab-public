import matplotlib.pyplot as plt

# Story points: 5 + 4 + 4 + 5 + 2 + 2 + 2 = 24
total_story_points = 24

# Standup checkpoints for Sprint 3
dates = ["Mar 27", "Mar 30", "Apr 2", "Apr 5"]
ideal_remaining = [total_story_points - (total_story_points / (len(dates) - 1)) * i for i in range(len(dates))]

# Actual burndown: start at full scope, 30% done by first standup and remainder finished through Week 03
actual_remaining = [
    24,  # Start of sprint
    17,  # Standup #1 (Mar 27)
    8,   # Standup #2 (Mar 30)
    0,   # Standup #3/4 (Apr 2–5)
]

plt.figure(figsize=(10, 6))
plt.plot(dates, ideal_remaining, marker='o', color='hotpink', label='Ideal Burndown')
plt.plot(dates, actual_remaining, marker='o', color='royalblue', label='Actual Burndown')

plt.title("FreshRoute Sprint 3 Burndown Chart")
plt.xlabel("Checkpoint Date")
plt.ylabel("Remaining Story Points")
plt.yticks(range(0, total_story_points + 1))
plt.grid(True, alpha=0.3)
plt.legend()
plt.tight_layout()
plt.show()
