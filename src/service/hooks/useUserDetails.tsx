import { useRecoilState } from "recoil";
import { loginState } from "../../states/loginState";
import axios from "axios";

export const useUserDetails = () => {
	const [globalUser] = useRecoilState(loginState);
	const fetchIsAdmin = async () => {
		const apiUrl = import.meta.env.VITE_BASE_API_URL + "/users/isAdmin";
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};
		try {
			const response = await axios.get(apiUrl, config);
			return response.data.data;
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	const getMyData = async () => {
		const apiUrl = import.meta.env.VITE_BASE_API_URL + "/users/me";
		const config = {
			headers: {
				Authorization: `Bearer ${globalUser.token}`,
			},
		};
		try {
			const response = await axios.get(apiUrl, config);
			return response.data.data;
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	return { fetchIsAdmin, getMyData };
};
