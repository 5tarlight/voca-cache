import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>header</header>
      <main className="w-full overflow-x-hidden min-h-[100vh]">
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
}
