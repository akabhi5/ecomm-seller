import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { AxiosResponse } from "axios";
import { queryStaleTime } from "../../../utils";
import MoveToCentre from "../../../components/MoveToCentre/MoveToCentre";
import { Brand } from "../../../types/Brand";
import { useEffect } from "react";

type Inputs = {
  name: string;
  image: string;
  description: string;
  slug: string;
};

const EditBrand = () => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const brandSlug = params.brandSlug;

  const {
    isPending: isLoadingBrand,
    isError,
    data: brand,
    isSuccess,
  } = useQuery<Brand>({
    queryKey: ["seller-brands", brandSlug],
    queryFn: () =>
      http.get(`/brands/${brandSlug}/`).then((response) => response.data),
    staleTime: queryStaleTime,
  });

  useEffect(() => {
    if (isSuccess) {
      setValue("name", brand.name);
      setValue("image", brand.image);
      setValue("slug", brand.slug);
      setValue("description", brand.description);
    }
  }, [isSuccess]);

  const { mutate: submitEditedBrand, isPending } = useMutation<
    AxiosResponse,
    Error,
    Inputs,
    unknown
  >({
    mutationFn: (updatedBrand) => {
      return http
        .patch(`/brands/${brandSlug}/`, updatedBrand)
        .then((response) => response.data);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["seller-brands", brandSlug] });
      toast.success("Brand edited!", {
        position: "bottom-right",
      });
      reset();
      navigate("/brands");
    },
    onError: () => {
      toast.error("Some error occurred. Try again!", {
        position: "bottom-right",
      });
    },
  });

  const { mutate: deleteBrand, isPending: isDeleting } = useMutation<
    AxiosResponse,
    Error,
    void,
    unknown
  >({
    mutationFn: () => {
      return http
        .delete(`/brands/${brandSlug}/`)
        .then((response) => response.data);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["seller-brands"] });
      toast.success("Brand deleted!", {
        position: "bottom-right",
      });
      navigate("/brands");
    },
    onError: () => {
      toast.error("Some error occurred. Try again!", {
        position: "bottom-right",
      });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitEditedBrand(data);
  };

  const openDeleteModal = () => {
    (document.getElementById("delete_modal") as HTMLFormElement).showModal();
  };

  if (isLoadingBrand) {
    return (
      <MoveToCentre>
        <progress className="progress w-56"></progress>
      </MoveToCentre>
    );
  }

  if (isError)
    return (
      <MoveToCentre>
        <div className="text-2xl">Unable to fetch brand info.</div>
      </MoveToCentre>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold my-5">
          Edit brand: {brand.name}
        </div>
        <div>
          <button
            className="btn btn-sm btn-error text-white text-lg"
            onClick={openDeleteModal}
          >
            Delete brand
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
            <span className="label-text text-lg">Image URL</span>
          </div>
          <input
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
            {...register("image", { required: true })}
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

      <div>
        <dialog id="delete_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Delete brand: {brand.name}</h3>
            <p className="py-4">Are you sure to delete brand: {brand.name}</p>
            <p>All products for this brand will also be deleted.</p>
            <button
              className="btn btn-sm text-white btn-error float-end"
              onClick={() => deleteBrand()}
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

export default EditBrand;
