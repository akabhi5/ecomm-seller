import { useForm, SubmitHandler } from "react-hook-form";
// import { http } from "../../api-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { AxiosResponse } from "axios";

type Inputs = {
  name: string;
  image: string;
  description: string;
  slug: string;
};

const AddBrand = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const navigate = useNavigate();

  const { mutate: addNewBrand, isPending } = useMutation<
    AxiosResponse,
    Error,
    Inputs,
    unknown
  >({
    mutationFn: (newBrand) => {
      return http.post("/brands/", newBrand);
    },
    onSuccess: () => {
      // Invalidate and refetch
      //   queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success("Brand added!", {
        position: "bottom-right",
      });
      reset();
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addNewBrand(data);
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

export default AddBrand;
