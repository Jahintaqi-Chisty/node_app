import { forwardRef } from "react";

const TextField = forwardRef(({ label, ...otherProps }, ref) => (
  <div className="flex flex-col my-2">
    <label className="text-sm text-gray-700 font-bold">{label}</label>
    <input
      ref={ref}
      {...otherProps}
      className="outline-indigo-500 border-indigo-200 rounded-sm"
    />
  </div>
));

export default TextField;
