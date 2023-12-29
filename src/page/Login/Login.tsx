import { useForm, SubmitHandler } from "react-hook-form";
import { httpNoAuth, setHttpToken } from "../../api-client";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { setAuthCookies } from "../../cookie";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    httpNoAuth
      .post("/user/seller/login/", data)
      .then((res) => {
        dispatch(setUser(res.data));
        setAuthCookies(res.data.name, res.data.email, res.data.token);
        setHttpToken(res.data.token);
        navigate("/");
        toast.success("Logged in!", {
          position: "bottom-right",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occurred. Please try again!", {
          position: "bottom-right",
        });
      });
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
          <div className="mt-4">
            <button className="btn btn-neutral text-lg">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
