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
import Image from "next/image";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

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
          }),
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
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
      <div
        className="w-full max-w-6xl min-h-[650px] bg-[var(--surface)] rounded-3xl 
                    shadow-[0_20px_60px_var(--shadow-color)] 
                    overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* LEFT SIDE */}
        <div
          className="hidden md:flex flex-col justify-between 
                      bg-gradient-to-br from-[var(--primary-dark)] 
                      to-[var(--primary)] 
                      text-white p-12 relative"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-wide mb-8">
              Tasqerra
            </h2>

            <p className="text-sm text-white/70 mb-6">
              Start organizing your work the smarter way.
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Plan better. <br />
              Collaborate smoothly. <br />
              Deliver faster.
            </h1>

            <p className="mt-6 text-white/70 max-w-md">
              Create boards, manage tasks, and keep your team aligned — all in
              one powerful workspace.
            </p>
          </div>

          <div className="flex justify-center mt-2">
            <Image
              src="/authentication/task.png"
              alt="Tasqerra preview"
              width={280}
              height={280}
              className="drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center h-full p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <h1 className="text-3xl font-semibold mb-8 text-[var(--text-primary)]">
              Create Account
            </h1>

            <div className="space-y-5">
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
                inputProps={register("email", {
                  required: "Email is required",
                })}
                error={errors.email}
                required
              />

              <FormInput
                label="Password"
                type="password"
                inputProps={register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full text-white font-medium
                         bg-[var(--primary)]
                         hover:bg-[var(--primary-dark)]
                         transition-all duration-300"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </div>

            <p className="text-sm text-center mt-6 text-[var(--text-secondary)]">
              Already have an account?
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-[var(--primary)] font-medium ml-1 hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
