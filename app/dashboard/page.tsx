"use client";

import DashboardMain from "@/components/DashboardComponents/DashboardMain";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getApi } from "@/apis/BoardApis";

const Page = () => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.user?.token);

  const [boards, setBoards] = useState<any[]>([]);

  // 🔒 Protect Route
  useEffect(() => {
    if (!token) {
      toast.error("Please login to access the dashboard");
      router.push("/login");
    }
  }, [token, router]);

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
