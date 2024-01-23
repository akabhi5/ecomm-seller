import { FaReact } from "react-icons/fa";
import {
  SiAxios,
  SiDaisyui,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content flex justify-between items-center">
      <aside>
        <p>Tech used to build this app</p>

        <div className="flex items-center space-x-2">
          <div className="tooltip" data-tip="React">
            <FaReact size={40} />
          </div>
          <div className="tooltip" data-tip="React Query">
            <SiReactquery size={40} />
          </div>
          <div className="tooltip" data-tip="React Hook Form">
            <SiReacthookform size={40} />
          </div>
          <div className="tooltip" data-tip="Vite">
            <SiVite size={40} />
          </div>
          <div className="tooltip" data-tip="Redux Toolkit">
            <SiRedux size={40} />
          </div>
          <div className="tooltip" data-tip="React Router DOM">
            <SiReactrouter size={50} />
          </div>
          <div className="tooltip" data-tip="Axios">
            <SiAxios size={40} />
          </div>
          <div className="tooltip" data-tip="TailwindCSS">
            <SiTailwindcss size={40} />
          </div>
          <div className="tooltip" data-tip="DaisyUI">
            <SiDaisyui size={50} />
          </div>
        </div>
      </aside>

      <aside>
        <a
          href="https://www.abhishekkumar.bio/"
          target="_blank"
          className="hover:underline"
        >
          abhishekkumar.bio
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
