import NavBar from "../NavBar/NavBar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <main className="p-5">{children}</main>
    </>
  );
};

export default Layout;
