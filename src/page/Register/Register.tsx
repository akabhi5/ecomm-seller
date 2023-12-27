import { useForm, SubmitHandler } from "react-hook-form";
import { http } from "../../api-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const Register = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.password2) {
      http
        .post("/user/register/", {
          name: data.name,
          email: data.email,
          password: data.password,
          role: "SE",
        })
        .then(() => {
          navigate("/login");
          toast.success("Registration successful!", {
            position: "bottom-right",
          });
          reset();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="max-w-lg mx-auto ">
      <div className="w-full">
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
              <span className="label-text text-lg">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Password</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Password</span>
            </div>
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered w-full"
              {...register("password2", { required: true })}
            />
          </label>
          <div className="mt-4">
            <button className="btn btn-neutral text-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
