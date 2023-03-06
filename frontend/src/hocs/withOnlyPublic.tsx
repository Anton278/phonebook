import { FullscreenSpin } from "../components/FullscreenSpin";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/redux/auth/selectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { refreshAccessToken } from "@/redux/auth/thunks";

export const withOnlyPublic = (Component: FC) => {
  const OnlyPublic = (props: any) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const router = useRouter();

    const checkAuth = async () => {
      try {
        await dispatch(refreshAccessToken()).unwrap();
        router.push("/contacts");
      } catch (e) {}
    };

    useEffect(() => {
      if (isAuth) {
        router.push("/");
        return;
      }
      if (localStorage.getItem("token")) {
        checkAuth();
      }
    }, []);

    if (isAuth) {
      return <FullscreenSpin />;
    }

    return <Component {...props} />;
  };

  return OnlyPublic;
};
