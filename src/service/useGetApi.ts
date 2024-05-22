// useApi.ts

import { useState, useEffect } from "react";
import axios from "axios";

interface ApiResponse<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

const useGetApi = <T>(url: string, token: string): ApiResponse<T> => {
	const [responseData, setResponseData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<T>(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				console.log(response.data);
				setResponseData(response.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { responseData, loading, error };
};

export default useGetApi;
