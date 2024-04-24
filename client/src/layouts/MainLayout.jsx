import { Outlet } from "react-router-dom";
import "../commonStyles/CommonStyles.css";
import Footer from "../components/footer/Footer";
import Nav from "../components/nav/Nav";

function MainLayout() {
  return (
    <>
      <header className="header">
        <Nav />
      </header>
      <main className="min-h-[calc(100vh-124px)]">
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default MainLayout;
