"use client";

import DashboardMain from "@/components/DashboardComponents/DashboardMain";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getApi } from "@/apis/BoardApis";
import { setUser } from "@/redux/slices/userSlice";

const Page = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user?.token);
 const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [boards, setBoards] = useState<any[]>([]);
 const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
  const urlToken = searchParams.get("token");
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  if (urlToken) {
    dispatch(
      setUser({
        token: urlToken,
        user: {
          name: name || "",
          email: email || "",
        },
      })
    );

    toast.success("Login successful!");

    router.replace("/dashboard");
    setCheckingAuth(false);
    return;
  }

  if (!token) {
    router.push("/login");
  } else {
    setCheckingAuth(false);
  }
}, [token, searchParams, dispatch, router]);

  // 📌 Fetch Boards
  const fetchBoards = async () => {
    try {
      if (!token) return;
      const res = await getApi(token);
      console.log("board api",res)
      if (res?.boards){
        setBoards(res?.boards || []);
      }else if (res.message === "Session expired, login again"){
        toast.error("Session expired, please login again");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch boards");
    }
  };

  useEffect(() => {
    if (token) fetchBoards();
  }, [token]);

  if (!token) return null; // Avoid flicker

  return <DashboardMain boards={boards} />;
};

export default Page;
