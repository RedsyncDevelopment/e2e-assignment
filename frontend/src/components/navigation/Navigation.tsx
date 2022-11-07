import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex gap-2">
      <Link to="/">Home</Link>
      <Link to="airports">Airports</Link>
      <Link to="airlines">Airlines</Link>
    </nav>
  );
};

export default Navigation;
