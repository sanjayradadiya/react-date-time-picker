import React, { FC, memo } from "react";
import "../../../styles/main-box.css";
import { PickerBoxProps } from "../../../types";

const PickerBox: FC<PickerBoxProps> = ({
  children,
  mainContainerClassName,
  mainContainerStyles,
}) => {
  return (
    <div
      className={`main-box ${mainContainerClassName}`}
      style={mainContainerStyles}
    >
      {children}
    </div>
  );
};

export default memo(PickerBox);
