import { Link, Outlet } from "react-router-dom";
import cn from "@yeahx4/cn";

export default function Layout() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="w-full flex justify-center h-16 mb-16 shadow-md">
        <div className="max-w-5xl flex justify-between w-full items-center px-4">
          <div>
            <Link to="/">Voca Cache</Link>
          </div>
          <div>
            <Link to="/manage">Manage</Link>
          </div>
        </div>
      </header>
      <main
        className={cn(
          "w-full overflow-x-hidden min-h-[100vh] max-w-5xl",
          "mx-auto px-4"
        )}
      >
        <Outlet />
      </main>
      <footer className="w-full flex justify-center h-16">
        <div
          className={cn(
            "max-w-5xl px-4 border-t border-gray-600 flex",
            "justify-between items-center w-full"
          )}
        >
          <div>&copy; {year === 2024 ? year : `2024-${year}`} YEAHx4.</div>
          <div>Github</div>
        </div>
      </footer>
    </>
  );
}
