import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { checkAuth } from "../features/userSlice";

const useAuthHook = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" &&
      localStorage.getItem("drip_access_token");

    if (token) {
      dispatch(checkAuth())
        .unwrap()
        .catch(() => {
          if (typeof window !== "undefined") {
            localStorage.removeItem("drip_access_token");
          }
          router.push("/login");
        });
    }
  }, []);
};

export default useAuthHook;
