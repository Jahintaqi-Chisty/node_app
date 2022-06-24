import { FaTimes } from "react-icons/fa";

const Snackbar = ({ message, id, removeError }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 p-3 rounded inline-flex items-center mt-3"
    role="alert"
  >
    <strong class="font-bold">Error! </strong>
    <span class="block sm:inline px-1">{message}</span>
    <button onClick={() => removeError(id)}>
      <FaTimes />
    </button>
  </div>
);

export default Snackbar;
