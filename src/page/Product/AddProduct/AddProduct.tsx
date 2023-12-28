import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http, httpNoAuth } from "../../../api-client";
import { AxiosResponse } from "axios";
import { Category } from "../../../types/Category";
import { Brand } from "../../../types/Brand";
import { queryStaleTime } from "../../../utils";

type Inputs = {
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string;
  category: number;
  brand: number;
};

function createArrayOfObjects(urlsString: string): { url: string }[] {
  const urls: string[] = urlsString.split(";").filter(Boolean); // Split string by ';' and remove empty strings

  const arrayOfObjects: { url: string }[] = urls.map((url) => ({ url }));

  return arrayOfObjects;
}

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: categories } = useQuery({
    queryKey: ["product-categories"],
    queryFn: () => httpNoAuth.get("/products/category/"),
    staleTime: queryStaleTime,
  });

  const { data: brands } = useQuery({
    queryKey: ["seller-brands"],
    queryFn: () => http.get("/brands/"),
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
      };
      return http.post("/products/", product);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      toast.success("Product added!", {
        position: "bottom-right",
      });
      reset();
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addNewProduct(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
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
            {brands?.data.map((brand: Brand) => (
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

export default AddProduct;
