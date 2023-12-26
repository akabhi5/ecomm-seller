import { useForm, SubmitHandler } from "react-hook-form";
import { http } from "../../api-client";

type Inputs = {
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    http
      .post("/user/seller/login/", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-lg mx-auto ">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Email</span>
            </div>
            <input
              type="email"
              placeholder="Password"
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
          <div className="mt-4">
            <button className="btn btn-neutral text-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
