import Form from "../../../components/inputs/Form";
import FormLabel from "../../../components/inputs/FormLabel";
import TextField from "../../../components/inputs/TextFields";
import { useForm } from "react-hook-form";
import { Axios } from "../../../../utils/config";
import { useAuth } from "../../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const onSubmit = async (formData) => {
    try {
      const { data } = await Axios.post("/api/user/login", formData);
      console.log(data);
      if (data) {
        login(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Login" />
      <TextField
        id="userName"
        {...register("userName", { required: true })}
        label="Username"
      />
      <TextField
        id="password"
        {...register("password", { required: true })}
        label="Password"
        type="password"
      />
      <button className="bg-indigo-500 text-white" type="submit">
        Login
      </button>
      {console.log(errors)}
    </Form>
  );
};

export default Login;