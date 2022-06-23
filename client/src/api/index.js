export const getDevices = async (axios) => {
  try {
    const { data } = await axios.get("/api/device/get-all");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
