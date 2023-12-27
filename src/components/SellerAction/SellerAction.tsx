import SellerActionCard from "../SellerActionCard/SellerActionCard";
import { FaTshirt } from "react-icons/fa";
import { TbBrandMyOppo } from "react-icons/tb";

const SellerAction = () => {
  const actions = [
    {
      name: "Add brand",
      link: "/brands/add",
      icon: <TbBrandMyOppo size={50} />,
    },
    {
      name: "Add product",
      link: "/products/add",
      icon: <FaTshirt size={50} />,
    },
  ];

  return (
    <div className="flex space-x-8">
      {actions.map((action) => (
        <SellerActionCard
          key={action.link}
          href={action.link}
          icon={action.icon}
          name={action.name}
        />
      ))}
    </div>
  );
};

export default SellerAction;
