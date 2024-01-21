import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { http, httpNoAuth } from "../../../api-client";
import { queryStaleTime } from "../../../utils";
import MoveToCentre from "../../../components/MoveToCentre/MoveToCentre";
import { Product } from "../../../types/Product";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { Category } from "../../../types/Category";
import { Brand } from "../../../types/Brand";
import { useEffect } from "react";

type Inputs = {
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string;
  category: number;
  brand: number;
};

const EditProduct = () => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const productSlug = params.productSlug;

  const {
    isPending: isLoadingProduct,
    isError,
    data: product,
    isSuccess,
  } = useQuery<Product>({
    queryKey: ["seller-products", productSlug],
    queryFn: () =>
      http.get(`/products/${productSlug}/`).then((response) => response.data),
    staleTime: queryStaleTime,
  });

  const { data: brands } = useQuery<Brand[]>({
    queryKey: ["seller-brands"],
    queryFn: () => http.get("/brands/").then((response) => response.data),
    staleTime: queryStaleTime,
  });

  const { data: categories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => httpNoAuth.get("/products/category/"),
    staleTime: queryStaleTime,
  });

  const { mutate: submitEditedProduct, isPending } = useMutation<
    AxiosResponse,
    Error,
    Inputs,
    unknown
  >({
    mutationFn: (updatedProduct) => {
      return http.patch(`/products/${productSlug}/`, updatedProduct);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["seller-products", productSlug],
      });
      toast.success("Product edited!", {
        position: "bottom-right",
      });
      reset();
      navigate("/products");
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setValue("name", product.name);
      setValue("slug", product.slug);
      setValue("price", parseFloat(product.price));
      setValue("category", product.category.id);
      setValue(
        "images",
        product.product_images.map((image) => image.url).join(";")
      );
      setValue("brand", product.brand);
      setValue("description", product.description);
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitEditedProduct(data);
  };

  if (isLoadingProduct) {
    return (
      <MoveToCentre>
        <progress className="progress w-56"></progress>
      </MoveToCentre>
    );
  }

  if (isError)
    return (
      <MoveToCentre>
        <div className="text-2xl">Unable to fetch product info.</div>
      </MoveToCentre>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-3xl font-semibold my-5">
        Edit product: {product.name}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg">Name</span>
          </div>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg">Slug</span>
          </div>
          <input
            type="text"
            placeholder="Slug"
            className="input input-bordered w-full"
            {...register("slug", { required: true })}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg">Price</span>
          </div>
          <input
            type="number"
            placeholder="Price"
            className="input input-bordered w-full"
            {...register("price", { required: true })}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg">Category</span>
          </div>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            {categories?.data.map((category: Category) =>
              category.subcategories.map((subcat) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </option>
              ))
            )}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg">Brand</span>
          </div>
          <select
            {...register("brand", { required: true })}
            className="select select-bordered w-full"
          >
            {brands?.map((brand: Brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-lg">
              Image URL
              <code className="text-xs">
                [enter semicolon(;) separated links]
              </code>
            </span>
          </div>
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
            {...register("images", { required: true })}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text text-lg">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 text-base"
            placeholder="Description"
            {...register("description", { required: true })}
          ></textarea>
        </label>

        <div className="mt-4">
          <button className="btn btn-neutral text-lg">
            {isPending && <span className="loading loading-spinner"></span>}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
