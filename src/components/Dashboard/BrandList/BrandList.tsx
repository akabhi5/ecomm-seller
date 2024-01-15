import { useQuery } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { Brand } from "../../../types/Brand";
import { queryStaleTime } from "../../../utils";
import { Link } from "react-router-dom";

const BrandList = () => {
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

  if (brands?.data.length <= 0) {
    return (
      <div>
        <div>No brands to show</div>
        <Link to="/brands/add" className="text-xs float-right text-slate-600">
          Add brands
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-xl underline">Brands</div>
      <div>
        <ul>
          {brands?.data.map((brand: Brand) => (
            <li key={brand.id}>{brand.name}</li>
          ))}
        </ul>
      </div>
      <Link
        to="/brands"
        className="text-xs float-right text-slate-600 underline"
      >
        View all brands
      </Link>
    </div>
  );
};

export default BrandList;
