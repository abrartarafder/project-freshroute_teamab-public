import matplotlib.pyplot as plt

total_story_points = 17

dates = ["Feb 22", "Feb 27", "Mar 3", "Mar 6"]

ideal_remaining = [17, 11.33, 5.67, 0]

actual_remaining = [17, 13, 6, 0]

plt.figure(figsize=(10, 6))
plt.plot(dates, ideal_remaining, marker='o', label='Ideal Burndown')
plt.plot(dates, actual_remaining, marker='o', label='Actual Burndown')

plt.title("FreshRoute Sprint 1 Burndown Chart")
plt.xlabel("Standup Date")
plt.ylabel("Remaining Story Points")
plt.yticks(range(0, total_story_points + 1))
plt.grid(True, alpha=0.3)
plt.legend()
plt.tight_layout()
plt.show()