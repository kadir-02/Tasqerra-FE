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
import Image from "next/image";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);

    try {
      const res = await loginUser(data.email, data.password);
      const loginData = res.data;

      if (!res.success) {
        // check success instead of message
        toast.error(res.message || "Login failed");
        return;
      }

      if (loginData?.token) {
        dispatch(
          setUser({
            token: loginData.token,
            user: loginData.user,
          }),
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
              Smart task management for modern teams.
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Organize work. <br />
              Move faster. <br />
              Stay aligned.
            </h1>

            <p className="mt-6 text-white/70 max-w-md">
              Manage projects, track progress, and collaborate effortlessly —
              all in one place.
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
              Sign In
            </h1>

            <div className="space-y-5">
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
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3
                       border border-[var(--border-color)]
                       rounded-full py-3 mt-4
                       hover:bg-[var(--surface-hover)]
                       transition font-medium text-[var(--text-primary)]"
            >
              <Image
                src="/authentication/g-logo.png"
                alt="Google"
                width={22}
                height={22}
              />
              Login with Google
            </button>

            <p className="text-sm text-center mt-6 text-[var(--text-secondary)]">
              Don't have an account?
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-[var(--primary)] font-medium ml-1 hover:underline"
              >
                Create account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
