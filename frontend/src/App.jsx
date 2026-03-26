import Landing from "./pages/Landing";
import Organic from "./pages/Organic";
import EthicallyRaised from "./pages/EthicallyRaised";
import Recipes from "./pages/Recipes";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

const routes = [
  { path: /^\/organic/, component: Organic },
  { path: /^\/ethically-raised/, component: EthicallyRaised },
  { path: /^\/recipes/, component: Recipes },
  { path: /^\/cart/, component: Cart },
  { path: /^\/orders/, component: Orders },
];

export default function App() {
  const pathname = window.location.pathname;
  const match = routes.find((r) => r.path.test(pathname));
  const Page = match ? match.component : Landing;
  return <Page />;
}
