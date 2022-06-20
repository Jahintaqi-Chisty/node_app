const Form = ({ children, ...otherProps }) => (
  <form
    {...otherProps}
    className="max-w-md mx-auto mt-10 p-[40px] bg-indigo-50"
  >
    {children}
  </form>
);

export default Form;
