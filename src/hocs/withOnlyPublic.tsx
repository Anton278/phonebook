import { FullscreenSpin } from "../components/FullscreenSpin";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/redux/auth/selectors";

export const withOnlyPublic = (Component: FC) => {
  const OnlyPublic = (props: any) => {
    const isAuth = useAppSelector(selectIsAuth);
    const router = useRouter();

    useEffect(() => {
      if (isAuth) {
        router.push("/");
      }
    }, []);

    if (isAuth) {
      return <FullscreenSpin />;
    }

    return <Component {...props} />;
  };

  return OnlyPublic;
};
