import { FullscreenSpin } from "../components/FullscreenSpin";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export const withOnlyPublic = (Component: FC) => {
  const OnlyPublic = (props: any) => {
    const auth = false;
    const router = useRouter();

    useEffect(() => {
      if (auth) {
        router.push("/");
      }
    }, []);

    if (auth) {
      return <FullscreenSpin />;
    }

    return <Component {...props} />;
  };

  return OnlyPublic;
};
