
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const useFetch = (url, method) => {
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);

    const showSnackBar = useCallback((msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'
        });
    }, [enqueueSnackbar]);

    useEffect(() => {
        const fetchData = async () => {
            let options = {
                url,
                method: 'GET'
            };
            if (method === 'POST') {
                options.method = 'POST';
                options.headers = {
                    'Accept': 'application/json'
                };
            }
            try {
                const response = await axios(options);
                setData(response.data);
            } catch (err) {
                showSnackBar('Cannot connect to backend', 'error');
            }
        };

        fetchData();
    }, [url, method, showSnackBar]); // Include showSnackBar in the dependency array

    return [data];
}

export default useFetch;
