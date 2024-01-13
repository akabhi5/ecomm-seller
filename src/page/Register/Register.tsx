import { useForm, SubmitHandler } from "react-hook-form";
import { httpNoAuth } from "../../api-client";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.password2) {
      setIsLoading(true);
      httpNoAuth
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
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err?.response?.status == 400) {
            if (err?.response?.data?.password !== undefined) {
              setError("password", {
                type: "custom",
                message: err.response.data.password.join(" "),
              });
              return;
            }
          }
          toast.error("Unable to register. Please try again!", {
            position: "bottom-right",
          });
        });
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
              {...register("name", {
                required: true,
                minLength: {
                  message:
                    "Length of name should be more than or equal to 3 chars",
                  value: 3,
                },
                maxLength: {
                  message:
                    "Length of name should be less than or equal to 24 chars",
                  value: 24,
                },
                pattern: {
                  message:
                    "Name should contain any digit or special characters",
                  value: /^[a-zA-Z\s]*$/,
                },
              })}
            />
            <div>
              <span className="text-xs text-red-600">
                {errors.name?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Email</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", {
                required: true,
                pattern: {
                  message: "Enter a valid email",
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                },
              })}
            />
            <div>
              <span className="text-xs text-red-600">
                {errors.email?.message}
              </span>
            </div>
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
            <div>
              <span className="text-xs text-red-600">
                {errors.password?.message}
              </span>
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-lg">Password</span>
            </div>
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered w-full"
              {...register("password2", {
                required: true,
                validate: (value, formValues) => {
                  if (value !== formValues.password) {
                    return "Password and confirm password do not match.";
                  }
                  return true;
                },
              })}
            />
            <div>
              <span className="text-xs text-red-600">
                {errors.password2?.message}
              </span>
            </div>
          </label>
          <div className="mt-4">
            <button className="btn btn-neutral text-lg">
              {isLoading && <span className="loading loading-spinner"></span>}
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
