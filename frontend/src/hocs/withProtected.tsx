import { FullscreenSpin } from "../components/FullscreenSpin";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/redux/auth/selectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { refreshAccessToken } from "@/redux/auth/thunks";

export const withProtected = (Component: FC) => {
  const Protected = (props: any) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const router = useRouter();

    const checkAuth = async () => {
      try {
        await dispatch(refreshAccessToken()).unwrap();
      } catch (e) {
        router.push("/signin");
      }
    };

    useEffect(() => {
      if (isAuth) {
        return;
      }
      if (!localStorage.getItem("token")) {
        router.push("/signin");
        return;
      }
      checkAuth();
    }, [isAuth]);

    if (!isAuth) {
      return <FullscreenSpin />;
    }

    return <Component {...props} />;
  };

  return Protected;
};
