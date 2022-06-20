const FormLabel = ({ label, ...otherProps }) => (
  <h1
    {...otherProps}
    className="my-3 mx-auto text-indigo-500 text-3xl font-bold"
  >
    {label}
  </h1>
);

export default FormLabel;
