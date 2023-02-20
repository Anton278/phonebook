import s from "./FullscreenSpin.module.scss";
import { Spin } from "antd";
import { FC } from "react";

const FullscreenSpin: FC = () => {
  return (
    <div className={s.fullscreenContainer}>
      <Spin size="large" />
    </div>
  );
};

export { FullscreenSpin };
