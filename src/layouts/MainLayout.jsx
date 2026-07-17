import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;