import axios from "axios";

export const fetchDesignByUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/me/designs`,
      {
        withCredentials: true,
      },
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
