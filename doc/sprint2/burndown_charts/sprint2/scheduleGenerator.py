from matplotlib import pyplot as plt
from matplotlib.patches import Ellipse
import networkx as nx
import math
import os

# ---------------------------------
# network graph
# ---------------------------------
G = nx.DiGraph()

edges = [
    ("Browse Organic\nProducts", "Add Grocery\nItems"),
    ("Browse Ethically Raised\nProducts", "Add Grocery\nItems"),
    ("Browse Recipes", "Add Recipe\nIngredients"),
    ("Add Grocery\nItems", "Review Cart"),
    ("Add Recipe\nIngredients", "Review Cart"),
    ("Review Cart", "Update\nQuantity"),
    ("Review Cart", "Delete\nItems"),
    ("Review Cart", "Checkout"),
]

G.add_edges_from(edges)

# ---------------------------------
# Manual positions for clean layout
# ---------------------------------
pos = {
    "Browse Organic\nProducts": (-3.8, 1.8),
    "Browse Ethically Raised\nProducts": (-3.8, -0.2),
    "Browse Recipes": (-3.8, -2.2),

    "Add Grocery\nItems": (-0.8, 0.8),
    "Add Recipe\nIngredients": (-0.8, -1.6),

    "Review Cart": (2.2, -0.4),

    "Update\nQuantity": (5.2, 1.0),
    "Delete\nItems": (5.2, -0.6),
    "Checkout": (5.2, -2.2),
}

# ---------------------------------
# Figure setup
# ---------------------------------
fig, ax = plt.subplots(figsize=(13, 8))
ax.set_xlim(-5.3, 6.8)
ax.set_ylim(-3.2, 2.8)
ax.axis("off")

NODE_WIDTH = 2.4
NODE_HEIGHT = 0.95
RX = NODE_WIDTH / 2
RY = NODE_HEIGHT / 2

# ---------------------------------
# Helper to connect arrows cleanly
# from ellipse edge to ellipse edge
# ---------------------------------
def ellipse_boundary_point(center, other, rx, ry):
    x1, y1 = center
    x2, y2 = other
    dx = x2 - x1
    dy = y2 - y1

    if dx == 0 and dy == 0:
        return center

    scale = 1 / math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry))
    return (x1 + dx * scale, y1 + dy * scale)

# ---------------------------------
# Draw edges
# ---------------------------------
for source, target in G.edges():
    start = ellipse_boundary_point(pos[source], pos[target], RX, RY)
    end = ellipse_boundary_point(pos[target], pos[source], RX, RY)

    ax.annotate(
        "",
        xy=end,
        xytext=start,
        arrowprops=dict(
            arrowstyle="-|>",
            lw=1.3,
            color="black",
            shrinkA=0,
            shrinkB=0
        ),
        zorder=1
    )

# ---------------------------------
# Draw ellipse nodes
# ---------------------------------
for node, (x, y) in pos.items():
    ellipse = Ellipse(
        (x, y),
        width=NODE_WIDTH,
        height=NODE_HEIGHT,
        facecolor="#dbe8f6",
        edgecolor="#9bb3cc",
        linewidth=1.2,
        zorder=2
    )
    ax.add_patch(ellipse)

    ax.text(
        x,
        y,
        node,
        ha="center",
        va="center",
        fontsize=10,
        color="#2f3b46",
        zorder=3

    )

# ---------------------------------
# Save output
# ---------------------------------
os.makedirs("charts", exist_ok=True)
plt.savefig("charts/network_diagram.pdf", bbox_inches="tight")

plt.show()