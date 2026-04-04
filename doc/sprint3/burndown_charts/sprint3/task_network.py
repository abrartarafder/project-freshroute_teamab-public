from matplotlib import pyplot as plt
from matplotlib.patches import FancyBboxPatch
import networkx as nx
import math


G = nx.DiGraph()

edges = [
    ("T1", "T2"),
    ("T1", "T3"),
    ("T2", "T4"),
    ("T2", "T5"),
    ("T3", "T5"),
    ("T5", "T6"),
    ("T4", "T6"),
    ("T6", "T7"),
    ("T7", "T8"),
    ("T8", "T9"),
    ("T9", "T8"),
]
G.add_edges_from(edges)


pos = {
    "T1": (-5.6,  0.0),
    "T2": (-2.5,  2.6),
    "T3": (-2.5,  0.0),
    "T4": ( 0.7,  2.6),
    "T5": ( 0.7,  0.0),
    "T6": ( 4.0,  0.0),
    "T7": ( 7.0,  0.0),
    "T8": (10.2,  0.6),
    "T9": (13.4, -0.2),
}

legend_labels = {
    "T1": "Browse Products (Organic/Ethical)",
    "T2": "Add Grocery Items",
    "T3": "Filter & Sort",
    "T4": "Review Cart",
    "T5": "Recipe → Cart",
    "T6": "Checkout (Address/Slot)",
    "T7": "Order Confirmation",
    "T8": "Orders Page (View/Track)",
    "T9": "Cancel Order",
}

fig, ax = plt.subplots(figsize=(14, 8))
fig.patch.set_facecolor("white")
ax.set_facecolor("white")
ax.axis("off")
ax.set_xlim(-7.6, 15.0)
ax.set_ylim(-4.2, 3.6)

node_w, node_h = 1.65, 0.82
rx, ry = node_w / 2, node_h / 2


def rect_edge(a, b, rx, ry):
    x1, y1 = a
    x2, y2 = b
    dx, dy = x2 - x1, y2 - y1

    if dx == 0 and dy == 0:
        return a

    scale = 1 / math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry))
    return (x1 + dx * scale, y1 + dy * scale)


curve_map = {
    ("T1", "T2"): 0.0,
    ("T1", "T3"): 0.0,
    ("T2", "T4"): 0.0,
    ("T2", "T5"): 0.0,
    ("T3", "T5"): 0.0,
    ("T5", "T6"): 0.0,
    ("T4", "T6"): 0.0,
    ("T6", "T7"): 0.0,
    ("T7", "T8"): 0.0,
    ("T8", "T9"): 0.0,
    ("T9", "T8"): 0.05,
}


for s, t in edges:
    start = rect_edge(pos[s], pos[t], rx, ry)
    end = rect_edge(pos[t], pos[s], rx, ry)

    dx, dy = end[0] - start[0], end[1] - start[1]
    dist = math.hypot(dx, dy)

    if dist > 0:
        ux, uy = dx / dist, dy / dist
        gap = 0.04
        start = (start[0] + ux * gap, start[1] + uy * gap)
        end = (end[0] - ux * gap, end[1] - uy * gap)

    ax.annotate(
        "",
        xy=end,
        xytext=start,
        arrowprops=dict(
            arrowstyle="-|>",
            lw=2.8,
            color="#f0b51f",
            mutation_scale=18,
            shrinkA=0,
            shrinkB=0,
            connectionstyle=f"arc3,rad={curve_map[(s, t)]}",
        ),
        zorder=1,
    )


for node, (x, y) in pos.items():
    box = FancyBboxPatch(
        (x - rx, y - ry),
        node_w,
        node_h,
        boxstyle="square,pad=0.0",
        facecolor="#dff0df",
        edgecolor="#2e5a28",
        linewidth=1.8,
        zorder=2,
    )
    ax.add_patch(box)

    ax.text(
        x, y,
        node,
        ha="center",
        va="center",
        fontsize=13,
        fontweight="bold",
        color="#2e5a28",
        zorder=3,
    )


legend_text = "\n".join(f"{k}: {v}" for k, v in legend_labels.items())
ax.text(
    -7.35, -3.9,
    legend_text,
    ha="left",
    va="bottom",
    fontsize=11,
    color="#143016",
    bbox=dict(
        facecolor="#f4f5f2",
        edgecolor="#2e5a28",
        boxstyle="round,pad=0.35"
    ),
)

plt.savefig("task_dependency_clean.png", dpi=300, bbox_inches="tight")
plt.show()
