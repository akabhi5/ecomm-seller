import React from "react";

interface Props {
  children: React.ReactNode;
}

const MoveToCentre = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center h-[70vh]">{children}</div>
  );
};

export default MoveToCentre;
