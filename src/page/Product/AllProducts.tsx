import { useQuery } from "@tanstack/react-query";
import { http } from "../../api-client";
import { queryStaleTime } from "../../utils";
import { Product } from "../../types/Product";
import MoveToCentre from "../../components/MoveToCentre/MoveToCentre";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link, useSearchParams } from "react-router-dom";
import { Brand } from "../../types/Brand";
import { useEffect, useState } from "react";

const defaultBrandName = "all";

const AllProducts = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>(defaultBrandName);
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isPending, data: products } = useQuery<Product[]>({
    queryKey: ["seller-products"],
    queryFn: () => http.get("/products/").then((response) => response.data),
    staleTime: queryStaleTime,
  });

  const { data: brands } = useQuery<Brand[]>({
    queryKey: ["seller-brands"],
    queryFn: () => http.get("/brands/").then((response) => response.data),
    staleTime: queryStaleTime,
  });

  useEffect(() => {
    const brandFromLink = searchParams.get("brand");
    if (brandFromLink) setSelectedBrand(brandFromLink);

    let filteredProducts;
    if (selectedBrand === defaultBrandName) {
      filteredProducts = products ? [...products] : [];
    } else {
      filteredProducts =
        products?.filter((product) => product.brand.name === selectedBrand) ??
        [];
    }
    setProductList(filteredProducts);
  }, [selectedBrand, products]);

  const onChangeBrandSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedBrand(value);
    if (value == defaultBrandName) {
      setSearchParams();
    } else {
      setSearchParams({ brand: value });
    }
  };

  if (isPending) {
    return (
      <MoveToCentre>
        <progress className="progress w-56"></progress>
      </MoveToCentre>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      <div className="flex space-x-5">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select brand</span>
          </div>
          <select
            defaultValue={selectedBrand}
            onChange={onChangeBrandSelect}
            className="select select-sm select-bordered"
          >
            <option value={defaultBrandName}>All</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {productList?.map((product) => (
          <Link key={product.id} to={`/products/${product.slug}/edit`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
