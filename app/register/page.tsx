"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

import { setUser } from "@/redux/slices/userSlice";
import { registerUser } from "@/apis/authApis";

import FormInput from "@/components/CommonComponents/FormInput";
import LoadingButton from "@/components/CommonComponents/LoadingButton";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterForm>();

  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const res = await registerUser(formData);

      if (res?.token) {
        dispatch(
          setUser({
            token: res.token,
            user: res.user,
          })
        );
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-(--background) px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl shadow-lg 
                   border border-(--border-color)
                   bg-(--surface) p-8 animate-fadeIn"
      >
        <h1 className="text-3xl font-bold text-center text-(--primary) mb-8">
          Create Your Account
        </h1>

        <div className="space-y-4">
          <FormInput
            label="Full Name"
            type="text"
            inputProps={register("name", { required: "Name is required" })}
            error={errors.name}
            required
          />

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
            title="Create Account"
            loading={loading}
            success={false}
          />
        </div>

        <p className="text-sm text-center mt-6 text-(--text-secondary)">
          Already have an account?
          <span
            className="text-(--primary) ml-1 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
