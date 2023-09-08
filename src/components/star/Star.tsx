import React from "react";

interface Props {
  is_full?: boolean;
}

export const Star: React.FC<Props> = (props) => {
  return (
    <img
      width={10}
      height={10}
      src={props.is_full ? "/full-star.svg" : "/empty-star.svg"}
    />
  );
};
