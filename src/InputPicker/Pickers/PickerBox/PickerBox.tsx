import React, { FC, ReactNode, memo } from "react";
import "../../../styles/main-box.css";
interface Props {
  children: ReactNode;
}

const PickerBox: FC<Props> = ({ children }) => {
  return <div className="main-box">{children}</div>;
};

export default memo(PickerBox);
