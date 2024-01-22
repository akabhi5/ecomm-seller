import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <main className="p-5 min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
