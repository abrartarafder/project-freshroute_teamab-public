import matplotlib.pyplot as plt

total_story_points = 26

dates = ["Mar 13", "Mar 15", "Mar 17", "Mar 22"]

ideal_remaining = [total_story_points - (total_story_points / (len(dates) - 1)) * i for i in range(len(dates))]

actual_remaining = [total_story_points, 13, 6, 0]

plt.figure(figsize=(10, 6))
plt.plot(dates, ideal_remaining, marker='o', color='red', label='Ideal Burndown')
plt.plot(dates, actual_remaining, marker='o', color='green', label='Actual Burndown')

plt.title("FreshRoute Sprint 2 Burndown Chart")
plt.xlabel("Standup Date")
plt.ylabel("Remaining Story Points")
plt.yticks(range(0, total_story_points + 1))
plt.grid(True, alpha=0.3)
plt.legend()
plt.tight_layout()
plt.show()
