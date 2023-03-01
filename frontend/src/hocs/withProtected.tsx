import { FullscreenSpin } from "../components/FullscreenSpin";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/redux/auth/selectors";

export const withProtected = (Component: FC) => {
  const Protected = (props: any) => {
    const isAuth = useAppSelector(selectIsAuth);
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) {
        router.replace("/signin");
      }
    }, []);

    if (!isAuth) {
      return <FullscreenSpin />;
    }

    return <Component {...props} />;
  };

  return Protected;
};
