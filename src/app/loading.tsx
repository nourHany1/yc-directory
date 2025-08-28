import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <LoaderCircle />
    </div>
  );
};

export default loading;
