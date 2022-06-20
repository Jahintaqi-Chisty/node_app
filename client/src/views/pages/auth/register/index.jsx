import Form from "../../../components/inputs/Form";
import FormLabel from "../../../components/inputs/FormLabel";
import TextField from "../../../components/inputs/TextFields";
import { useForm } from "react-hook-form";
import { Axios } from "../../../../utils/config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (formData) => {
    try {
      const { data } = await Axios.post("/api/user/create", formData);
      console.log(data);
      if (data) {
        navigate("/auth/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Register" />
      <TextField
        id="firstName"
        {...register("firstName", { required: true })}
        label="First Name"
      />
      <TextField
        id="lastName"
        {...register("lastName", { required: true })}
        label="Last Name"
      />
      <TextField
        id="userName"
        {...register("userName", { required: true })}
        label="Username"
      />
      <TextField
        id="email"
        {...register("email", { required: true })}
        label="Email"
        type="email"
      />
      <TextField
        id="password"
        {...register("password", { required: true })}
        label="Password"
        type="password"
      />
      <TextField
        id="confirmPassword"
        {...register("confirmPassword", {
          required: true,
          validate: (value) => {
            const { password } = getValues();
            return value === password || "Passwords don't match";
          },
        })}
        label="Confirm Password"
        type="password"
      />
      <button className="bg-indigo-500 text-white" type="submit">
        Register
      </button>
      {console.log(errors)}
    </Form>
  );
};

export default Register;
