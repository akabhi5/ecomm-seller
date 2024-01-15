import { useQuery } from "@tanstack/react-query";
import { http } from "../../api-client";
import { queryStaleTime } from "../../utils";
import { Brand } from "../../types/Brand";

const BrandsList = () => {
  const { isPending, data: brands } = useQuery({
    queryKey: ["seller-brands"],
    queryFn: () => http.get("/brands/"),
    staleTime: queryStaleTime,
  });

  if (isPending) {
    return (
      <div className="flex justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-3xl my-3">Brands</div>

      <div>
        <div className="grid grid-cols-5 gap-5">
          {brands?.data.map((brand: Brand) => (
            <div key={brand.id} className="border p-3">
              <img src={brand.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsList;
