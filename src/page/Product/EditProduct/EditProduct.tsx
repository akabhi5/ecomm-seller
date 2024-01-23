import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { http, httpNoAuth } from "../../../api-client";
import {
  MAX_QUANTITY,
  MAX_QUANTITY_ERR_MSG,
  MIN_QUANTITY,
  MIN_QUANTITY_ERR_MSG,
  createArrayOfObjects,
  queryStaleTime,
} from "../../../utils";
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
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
};

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
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
      const product = {
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        price: updatedProduct.price.toString(),
        description: updatedProduct.description,
        product_images: createArrayOfObjects(updatedProduct.images),
        category: updatedProduct.category,
        brand: updatedProduct.brand,
        size_quantity: {
          xs: updatedProduct.xs,
          s: updatedProduct.s,
          m: updatedProduct.m,
          l: updatedProduct.l,
          xl: updatedProduct.xl,
        },
      };
      return http
        .patch(`/products/${productSlug}/`, product)
        .then((response) => response.data);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["seller-products"],
      });
      toast.success("Product edited!", {
        position: "bottom-right",
      });
      reset();
      navigate("/products");
    },
    onError: () => {
      toast.error("Some error occurred. Try again!", {
        position: "bottom-right",
      });
    },
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation<
    AxiosResponse,
    Error,
    void,
    unknown
  >({
    mutationFn: () => {
      return http
        .delete(`/products/${productSlug}/`)
        .then((response) => response.data);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["seller-products"],
      });
      toast.success("Product deleted!", {
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
      setValue("brand", product.brand.id);
      setValue("description", product.description);
      setValue("xs", product.size_quantity.xs);
      setValue("s", product.size_quantity.s);
      setValue("m", product.size_quantity.m);
      setValue("l", product.size_quantity.l);
      setValue("xl", product.size_quantity.xl);
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitEditedProduct(data);
  };

  const openDeleteModal = () => {
    (document.getElementById("delete_modal") as HTMLFormElement).showModal();
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
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold my-5">
          Edit brand: {product.name}
        </div>
        <div>
          <button
            className="btn btn-sm btn-error text-white text-lg"
            onClick={openDeleteModal}
          >
            Delete product
          </button>
        </div>
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

      <div>
        <dialog id="delete_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">
              Delete product: {product.name}
            </h3>
            <p className="py-4">
              Are you sure to delete product: {product.name}
            </p>

            <button
              className="btn btn-sm text-white btn-error float-end"
              onClick={() => deleteProduct()}
            >
              {isDeleting && <span className="loading loading-spinner"></span>}
              Confirm
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default EditProduct;
