import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http, httpNoAuth } from "../../../api-client";
import { AxiosResponse } from "axios";
import { Category } from "../../../types/Category";
import { Brand } from "../../../types/Brand";
import {
  MAX_QUANTITY,
  MAX_QUANTITY_ERR_MSG,
  MIN_QUANTITY,
  MIN_QUANTITY_ERR_MSG,
  createArrayOfObjects,
  queryStaleTime,
} from "../../../utils";

type Inputs = {
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string;
  category: number;
  brand: number;
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
};

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => httpNoAuth.get("/products/category/"),
    staleTime: queryStaleTime,
  });

  const { data: brands } = useQuery<Brand[]>({
    queryKey: ["seller-brands"],
    queryFn: () => http.get("/brands/").then((response) => response.data),
    staleTime: queryStaleTime,
  });

  const { mutate: addNewProduct, isPending } = useMutation<
    AxiosResponse,
    Error,
    Inputs,
    unknown
  >({
    mutationFn: (newProduct) => {
      const product = {
        name: newProduct.name,
        slug: newProduct.slug,
        price: newProduct.price.toString(),
        description: newProduct.description,
        product_images: createArrayOfObjects(newProduct.images),
        category: newProduct.category,
        brand: newProduct.brand,
        size_quantity: {
          xs: newProduct.xs,
          s: newProduct.s,
          m: newProduct.m,
          l: newProduct.l,
          xl: newProduct.xl,
        },
      };
      return http.post("/products/", product).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      toast.success("Product added!", {
        position: "bottom-right",
      });
      navigate("/products");
    },
    onError: () => {
      toast.error("Some error occurred. Try again!", {
        position: "bottom-right",
      });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addNewProduct(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-3xl font-semibold my-5">Add product</div>

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

        <div className="my-2">
          <div className="label">Size and quantity</div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0">
            <div className="flex rounded-lg shadow-sm">
              <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500">
                XS
              </span>
              <input
                type="number"
                defaultValue={0}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none border-2 focus:outline-none"
                {...register("xs", {
                  required: true,
                  min: { value: MIN_QUANTITY, message: MIN_QUANTITY_ERR_MSG },
                  max: { value: MAX_QUANTITY, message: MAX_QUANTITY_ERR_MSG },
                })}
              />
            </div>
            <div className="flex rounded-lg shadow-sm">
              <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500">
                S
              </span>
              <input
                type="number"
                defaultValue={0}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none border-2 focus:outline-none"
                {...register("s", {
                  required: true,
                  min: { value: MIN_QUANTITY, message: MIN_QUANTITY_ERR_MSG },
                  max: { value: MAX_QUANTITY, message: MAX_QUANTITY_ERR_MSG },
                })}
              />
            </div>
            <div className="flex rounded-lg shadow-sm">
              <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500">
                M
              </span>
              <input
                type="number"
                defaultValue={0}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none border-2 focus:outline-none"
                {...register("m", {
                  required: true,
                  min: { value: MIN_QUANTITY, message: MIN_QUANTITY_ERR_MSG },
                  max: { value: MAX_QUANTITY, message: MAX_QUANTITY_ERR_MSG },
                })}
              />
            </div>
            <div className="flex rounded-lg shadow-sm">
              <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500">
                L
              </span>
              <input
                type="number"
                defaultValue={0}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none border-2 focus:outline-none"
                {...register("l", {
                  required: true,
                  min: { value: MIN_QUANTITY, message: MIN_QUANTITY_ERR_MSG },
                  max: { value: MAX_QUANTITY, message: MAX_QUANTITY_ERR_MSG },
                })}
              />
            </div>
            <div className="flex rounded-lg shadow-sm">
              <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500">
                XL
              </span>
              <input
                type="number"
                defaultValue={0}
                className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 disabled:opacity-50 disabled:pointer-events-none border-2 focus:outline-none"
                {...register("xl", {
                  required: true,
                  min: { value: MIN_QUANTITY, message: MIN_QUANTITY_ERR_MSG },
                  max: { value: MAX_QUANTITY, message: MAX_QUANTITY_ERR_MSG },
                })}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-red-600">{errors.xs?.message}</span>
            <span className="text-xs text-red-600">{errors.s?.message}</span>
            <span className="text-xs text-red-600">{errors.m?.message}</span>
            <span className="text-xs text-red-600">{errors.l?.message}</span>
            <span className="text-xs text-red-600">{errors.xl?.message}</span>
          </div>
        </div>

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

export default AddProduct;
