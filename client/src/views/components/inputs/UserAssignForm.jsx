import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../hooks/useUser";
import { BiSend } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDevice } from "../../../hooks/useDevice";
const UserAssignForm = ({ deviceData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { users, userLoading } = useUser();
  const { getDevices } = useDevice();
  const axiosPrivate = useAxiosPrivate();
  const [edit, setEdit] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const { data } = await axiosPrivate.put(
        `/api/device/${deviceData.deviceId}`,
        formData
      );
      console.log(data);
      if (data) {
        getDevices();
        setEdit(false);
      }
      console.log(formData);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {edit ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <label htmlFor="users">Choose your browser from the list:</label> */}
          <div className="flex flex-row flex-nowrap justify-center content-center">
            <select
              id="userId"
              defaultValue={deviceData.defaultUser._id}
              {...register("userId", { required: true })}
            >
              {!userLoading &&
                users.map((user, id) => (
                  <option
                    value={user._id}
                    label={`${user.firstName} ${user.lastName}`}
                    key={id}
                  />
                ))}
            </select>

            <button type="reset" onClick={() => setEdit(false)}>
              <GiCancel />
            </button>
            <button type="submit">
              <BiSend />
            </button>
          </div>
          {console.log(errors)}
        </form>
      ) : (
        <div className="flex flex-row justify-center content-center  flex-nowrap">
          {!!deviceData.defaultUser && (
            <span>{`${deviceData.defaultUser.firstName} ${deviceData.defaultUser.lastName}`}</span>
          )}
          <button
            className="bg-indigo-500 text-white"
            onClick={() => setEdit(true)}
          >
            <FaEdit />
          </button>
        </div>
      )}
    </>
  );
};

//            <input
//              list="users"
//              name="userId"
//              id="userId"
//              defaultValue={defaultValue}
//              placeholder={defaultUser.firstName + defaultUser.lastName}
//            />
export default UserAssignForm;