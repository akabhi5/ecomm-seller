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
      return http.patch(`/brands/${brandSlug}/`, updatedBrand);
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
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    submitEditedBrand(data);
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
          <button className="btn btn-sm btn-outline text-lg">
            {isPending && <span className="loading loading-spinner"></span>}
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
    </div>
  );
};

export default EditBrand;