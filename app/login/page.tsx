"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setUser } from "../../redux/slices/userSlice";
import FormInput from "@/components/CommonComponents/FormInput";
import LoadingButton from "@/components/CommonComponents/LoadingButton";
import { useState } from "react";
import { loginUser } from "@/apis/authApis";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
  
    try {
      const res = await loginUser(data.email, data.password);
      const loginData = res.data;
  
      if (!res.success) { // check success instead of message
        toast.error(res.message || "Login failed");
        return;
      }
  
      if (loginData?.token) {
        dispatch(
          setUser({
            token: loginData.token,
            user: loginData.user,
          })
        );
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error("Login failed: no token returned");
      }
  
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`;
  }

  return (
    <div className="min-h-screen flex justify-center items-center 
                    bg-(--background) px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl shadow-lg 
                   border border-(--border-color)
                   bg-(--surface) p-8 animate-fadeIn"
      >
        <h1 className="text-3xl font-bold text-center text-(--primary) mb-8">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <FormInput
            label="Email Address"
            type="email"
            inputProps={register("email", { required: "Email is required" })}
            error={errors.email}
            required
          />

          <FormInput
            label="Password"
            type="password"
            inputProps={register("password", { required: "Password is required" })}
            error={errors.password}
            required
          />
        </div>

        <div className="mt-6">
          <LoadingButton
            title="Login"
            loading={loading}
            success={false}
          />
        </div>
         <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center gap-3
             border border-gray-300 rounded-lg py-3 mt-4
             hover:bg-gray-50 transition font-medium"
>
  <img
    src="authentication/g-logo.png"
    alt="google"
    className="w-8 h-8"
  />
  Login with Google
</button>

        <p className="text-sm text-center mt-6 text-(--text-secondary)">
          Don't have an account?
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="text-(--primary) ml-1 cursor-pointer hover:underline"
          >
            Create account
          </button>
        </p>
      </form>
    </div>
  );
}
