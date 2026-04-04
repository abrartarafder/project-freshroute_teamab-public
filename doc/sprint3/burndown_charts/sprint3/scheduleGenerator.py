from matplotlib import pyplot as plt
from matplotlib.patches import Ellipse
import networkx as nx
import math

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
    ("Update\nQuantity", "Review Cart"),
    ("Delete\nItems", "Review Cart"),
    ("Checkout", "Order\nConfirmation"),
    ("Order\nConfirmation", "Orders Page\n(View/Track)"),
    ("Orders Page\n(View/Track)", "Cancel\nOrder"),
    ("Cancel\nOrder", "Orders Page\n(View/Track)"),
]

G.add_edges_from(edges)

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

    "Order\nConfirmation": (8.2, -1.2),
    "Orders Page\n(View/Track)": (11.4, -0.6),
    "Cancel\nOrder": (14.2, -1.2),
}


fig, ax = plt.subplots(figsize=(13, 8))
ax.set_xlim(-5.3, 15.4)
ax.set_ylim(-3.2, 2.8)
ax.set_facecolor("#f4f5f2")
ax.axis("off")

NODE_WIDTH = 2.4
NODE_HEIGHT = 0.95
RX = NODE_WIDTH / 2
RY = NODE_HEIGHT / 2

def ellipse_boundary_point(center, other, rx, ry):
    x1, y1 = center
    x2, y2 = other
    dx = x2 - x1
    dy = y2 - y1

    if dx == 0 and dy == 0:
        return center

    scale = 1 / math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry))
    return (x1 + dx * scale, y1 + dy * scale)

for source, target in G.edges():
    start = ellipse_boundary_point(pos[source], pos[target], RX, RY)
    end = ellipse_boundary_point(pos[target], pos[source], RX, RY)

    dx = end[0] - start[0]
    dy = end[1] - start[1]
    dist = math.hypot(dx, dy)
    gap = 0
    if dist > 0:
        ux, uy = dx / dist, dy / dist
        start = (start[0] + ux * gap, start[1] + uy * gap)
        end = (end[0] - ux * gap, end[1] - uy * gap)

  
    if {"Review Cart", "Delete\nItems"} == {source, target} and dist > 0:
        perp_offset = 0.12
        perp_x, perp_y = -uy, ux  
        sign = 1 if source == "Review Cart" else -1
        start = (start[0] + perp_x * perp_offset * sign, start[1] + perp_y * perp_offset * sign)
        end = (end[0] + perp_x * perp_offset * sign, end[1] + perp_y * perp_offset * sign)

    ax.annotate(
        "",
        xy=end,
        xytext=start,
        arrowprops=dict(
            arrowstyle="-|>",
            lw=1.7,
            color="#f0b51f",  
            shrinkA=0,
            shrinkB=0,
            mutation_scale=14,
            connectionstyle="arc3,rad=0",
        ),
        zorder=2
    )

for node, (x, y) in pos.items():
    ellipse = Ellipse(
        (x, y),
        width=NODE_WIDTH,
        height=NODE_HEIGHT,
        facecolor="#dff0df",   
        edgecolor="#2e5a28",  
        linewidth=1.5,
        zorder=1
    )
    ax.add_patch(ellipse)

    ax.text(
        x,
        y,
        node,
        ha="center",
        va="center",
        fontsize=10,
        fontweight="bold",
        color="#2e5a28",
        zorder=3
    )


plt.savefig("network_diagram.png", dpi=300, bbox_inches="tight")

plt.show()
