import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { pathname } = useLocation();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  return (
    <>
      {isNavOpen ? (
        <nav
          className={`z-10 w-1/3 h-screen absolute top-0 right-0 bg-slate-300`}
        >
          <div className="flex flex-col items-center justify-center h-full text-lg gap-4 font-bold">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="airports" className="nav-link">
              Airports
            </Link>
            <Link to="airlines" className="nav-link">
              Airlines
            </Link>
            <Link to="routes" className="nav-link">
              Routes
            </Link>
          </div>
          <button
            className="absolute top-6 right-6"
            onClick={() => setIsNavOpen(false)}
          >
            <AiOutlineClose className="w-10 h-10 p-2 bg-slate-100" />
          </button>
        </nav>
      ) : (
        <button
          className="absolute top-6 right-6 z-10"
          onClick={() => setIsNavOpen(true)}
        >
          <AiOutlineMenu className="w-10 h-10 p-2 bg-slate-100" />
        </button>
      )}
    </>
  );
};

export default Navigation;
