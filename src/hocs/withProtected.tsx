import { FullscreenSpin } from "../components/FullscreenSpin";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export const withProtected = (Component: FC) => {
  const Protected = (props: any) => {
    const auth = false;
    const router = useRouter();

    useEffect(() => {
      if (!auth) {
        router.replace("/signin");
      }
    }, []);

    if (!auth) {
      return <FullscreenSpin />;
    }

    return <Component {...props} />;
  };

  return Protected;
};
