import { forwardRef } from "react";

const TextField = forwardRef(({ label, ...otherProps }, ref) => (
  <div className="flex flex-col my-2">
    <label className="text-sm text-gray-700 font-bold">{label}</label>
    <input
      ref={ref}
      {...otherProps}
      className=" p-2 text-indigo-700 border-b-2 border-indigo-500 focus:bg-gray-300 outline-none"
    />
  </div>
));

export default TextField;
