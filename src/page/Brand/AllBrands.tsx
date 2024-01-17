import { useQuery } from "@tanstack/react-query";
import { http } from "../../api-client";
import { queryStaleTime } from "../../utils";
import { Brand } from "../../types/Brand";
import { Link } from "react-router-dom";

const AllBrands = () => {
  const { isPending, data: brands } = useQuery<Brand[]>({
    queryKey: ["seller-brands"],
    queryFn: () => http.get("/brands/").then((response) => response.data),
    staleTime: queryStaleTime,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-3xl my-3">Brands</div>

      <div>
        <div className="grid grid-cols-5 gap-5">
          {brands?.map((brand: Brand) => (
            <Link
              to={`/brands/${brand.slug}/edit`}
              key={brand.id}
              className="border p-3"
            >
              <img src={brand.image} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBrands;
