import s from "./paper.module.scss";
import { FC } from "react";

type PaperProps = {
  children: React.ReactNode;
};

const Paper: FC<PaperProps> = ({ children }) => {
  return <div className={s.paper}>{children}</div>;
};

export { Paper };
