import { useQuery } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { Brand } from "../../../types/Brand";

const BrandList = () => {
  const { isPending, data: brands } = useQuery({
    queryKey: ["dashboard-brands"],
    queryFn: () => http.get("/brands/"),
  });

  if (isPending) {
    return (
      <div className="flex justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div>
      <div className="text-xl">Brands</div>
      <div>
        <ul>
          {brands?.data.map((brand: Brand) => (
            <li key={brand.id}>{brand.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BrandList;