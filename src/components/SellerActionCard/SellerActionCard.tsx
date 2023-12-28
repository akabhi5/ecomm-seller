import { Link } from "react-router-dom";

interface Props {
  href: string;
  name: string;
  icon: React.ReactNode;
}

const SellerActionCard = ({ href, name, icon }: Props) => {
  return (
    <Link to={href}>
      <div className="border-2 border-dashed border-black rounded-md w-24 h-24 flex items-center justify-center cursor-pointer hover:shadow-xl">
        {icon}
      </div>
      <div className="flex justify-center">{name}</div>
    </Link>
  );
};

export default SellerActionCard;
