import React from "react";
import { ThreeDots } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center text-red-500 h-[70vh]">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loading;
