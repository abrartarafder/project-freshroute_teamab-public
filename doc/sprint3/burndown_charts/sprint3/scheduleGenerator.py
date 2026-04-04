from matplotlib import pyplot as plt
from matplotlib.patches import Ellipse, Rectangle
import math

# -------------------------------------------------
# Edges
# -------------------------------------------------
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

# -------------------------------------------------
# Layout
# -------------------------------------------------
pos = {
    "Browse Organic\nProducts": (-5.2, 2.3),
    "Browse Ethically Raised\nProducts": (-5.2, 0.1),
    "Browse Recipes": (-5.2, -2.3),

    "Add Grocery\nItems": (-2.1, 1.1),
    "Add Recipe\nIngredients": (-2.1, -1.6),

    "Review Cart": (1.2, -0.2),

    "Update\nQuantity": (4.3, 1.3),
    "Delete\nItems": (4.3, -0.4),
    "Checkout": (4.3, -2.3),

    "Order\nConfirmation": (7.8, -1.2),
    "Orders Page\n(View/Track)": (11.8, -0.4),
    "Cancel\nOrder": (15.1, -1.2),
}

# -------------------------------------------------
# Bigger ellipse sizes so text fits
# -------------------------------------------------
node_sizes = {
    "Browse Organic\nProducts": (3.0, 1.20),
    "Browse Ethically Raised\nProducts": (4.3, 1.35),
    "Browse Recipes": (2.9, 1.15),

    "Add Grocery\nItems": (2.9, 1.12),
    "Add Recipe\nIngredients": (3.3, 1.18),

    "Review Cart": (2.6, 1.02),

    "Update\nQuantity": (2.7, 1.02),
    "Delete\nItems": (2.4, 1.02),
    "Checkout": (2.3, 1.02),

    "Order\nConfirmation": (2.9, 1.08),
    "Orders Page\n(View/Track)": (3.6, 1.12),
    "Cancel\nOrder": (2.6, 1.02),
}

BG = "#f4f5f2"
NODE_FILL = "#dff0df"
NODE_EDGE = "#2e5a28"
ARROW = "#f0b51f"
TEXT = "#2e5a28"
FRAME = "#1d6c25"


def ellipse_boundary_point(center, other, rx, ry):
    x1, y1 = center
    x2, y2 = other
    dx = x2 - x1
    dy = y2 - y1

    if dx == 0 and dy == 0:
        return center

    scale = 1 / math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry))
    return (x1 + dx * scale, y1 + dy * scale)


# -------------------------------------------------
# Calculate outer frame automatically from node bounds
# -------------------------------------------------
padding_x = 0.9
padding_y = 0.55

min_x = min(pos[node][0] - node_sizes[node][0] / 2 for node in pos) - padding_x
max_x = max(pos[node][0] + node_sizes[node][0] / 2 for node in pos) + padding_x
min_y = min(pos[node][1] - node_sizes[node][1] / 2 for node in pos) - padding_y
max_y = max(pos[node][1] + node_sizes[node][1] / 2 for node in pos) + padding_y

fig, ax = plt.subplots(figsize=(17, 8.5))
ax.set_xlim(min_x - 0.6, max_x + 0.6)
ax.set_ylim(min_y - 0.6, max_y + 0.6)
ax.set_facecolor(BG)
ax.axis("off")

# Outer frame
ax.add_patch(
    Rectangle(
        (min_x, min_y),
        max_x - min_x,
        max_y - min_y,
        fill=False,
        edgecolor=FRAME,
        linewidth=2.8,
        zorder=0
    )
)

# -------------------------------------------------
# Draw arrows
# -------------------------------------------------
for source, target in edges:
    sw, sh = node_sizes[source]
    tw, th = node_sizes[target]

    start = ellipse_boundary_point(pos[source], pos[target], sw / 2, sh / 2)
    end = ellipse_boundary_point(pos[target], pos[source], tw / 2, th / 2)

    dx = end[0] - start[0]
    dy = end[1] - start[1]
    dist = math.hypot(dx, dy)

    # Separate Review Cart <-> Delete Items double arrows
    if {source, target} == {"Review Cart", "Delete\nItems"} and dist > 0:
        ux, uy = dx / dist, dy / dist
        perp_x, perp_y = -uy, ux
        offset = 0.11
        sign = 1 if source == "Review Cart" else -1
        start = (start[0] + perp_x * offset * sign, start[1] + perp_y * offset * sign)
        end = (end[0] + perp_x * offset * sign, end[1] + perp_y * offset * sign)

    # Separate Orders Page <-> Cancel Order double arrows
    if {source, target} == {"Orders Page\n(View/Track)", "Cancel\nOrder"} and dist > 0:
        ux, uy = dx / dist, dy / dist
        perp_x, perp_y = -uy, ux
        offset = 0.09
        sign = 1 if source == "Orders Page\n(View/Track)" else -1
        start = (start[0] + perp_x * offset * sign, start[1] + perp_y * offset * sign)
        end = (end[0] + perp_x * offset * sign, end[1] + perp_y * offset * sign)

    ax.annotate(
        "",
        xy=end,
        xytext=start,
        arrowprops=dict(
            arrowstyle="-|>",
            lw=1.9,
            color=ARROW,
            shrinkA=0,
            shrinkB=0,
            mutation_scale=16,
            connectionstyle="arc3,rad=0",
        ),
        zorder=2
    )

# -------------------------------------------------
# Draw nodes
# -------------------------------------------------
for node, (x, y) in pos.items():
    width, height = node_sizes[node]

    ellipse = Ellipse(
        (x, y),
        width=width,
        height=height,
        facecolor=NODE_FILL,
        edgecolor=NODE_EDGE,
        linewidth=1.6,
        zorder=1
    )
    ax.add_patch(ellipse)

    ax.text(
        x,
        y,
        node,
        ha="center",
        va="center",
        fontsize=9.3,
        fontweight="bold",
        color=TEXT,
        zorder=3
    )

plt.savefig("workflow_network_diagram.png", dpi=300, bbox_inches="tight")
plt.show()
