/*import { createApi } from "@reduxjs/toolkit/query/react";

const customBaseQuery =
    //({ baseUrl } = { baseUrl: process.env.REACT_APP_API_URL }) =>
        ({ baseUrl } = { baseUrl: "http://localhost:8000" }) =>     
        async (
            { url, method = "GET", headers = {}, body = null },
            api,
            extraOptions
        ) => {
            const options = {
                method,
                headers,
                credentials: "include",
            };

            // adjust headers and body based on the request
            if (body && method !== "GET" && method !== "HEAD") {
                if (body instanceof FormData) {
                    options.body = body;
                } else {
                    options.body = JSON.stringify(body);
                    headers["Content-Type"] = "application/json";
                }
            }

            // fetches and parses JSON response to an object
            const response = await fetch(baseUrl + url, options);
            const result = await response.json();

            // backend error
            if (result.error) {
                // user not authenticated
                // if (result.error.status === 401) {
                //     return { data: { isAuthenticated: false } };
                // }

                return {
                    error: {
                        status: result.error.status,
                        message: result.error.message,
                    },
                };
            }

            return {
                data: result,
            };
        };



export const baseApi = createApi({
    baseQuery: customBaseQuery(),
    reducerPath: "baseApi",
    tagTypes: ["Auth", "User", "Post", "UserWidget", "Bookmark"],
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({}),
});
*/

import { createApi } from "@reduxjs/toolkit/query/react";

const customBaseQuery = ({ baseUrl } = { baseUrl: "https://constella-server.onrender.com" }) =>
    //const customBaseQuery = ({ baseUrl } = { baseUrl: "http://localhost:8000/api" }) =>  

    async ({ url, method = "GET", headers = {}, body = null }, api, extraOptions) => {
        const options = {
            method,
            headers,
            credentials: "include",
        };

        // Adjust headers and body based on the request
        if (body && method !== "GET" && method !== "HEAD") {
            if (body instanceof FormData) {
                options.body = body;
            } else {
                options.body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }
        }

        console.log(`Making request to: ${baseUrl}${url}`);
        console.log('Request options:', options);

        try {
            // Fetch and parse JSON response to an object
            const response = await fetch(baseUrl + url, options);
            const result = await response.json();

            console.log('Response status:', response.status);
            console.log('Raw response:', result);

            // Check for backend error
            if (result.error) {
                console.error('Backend error:', result.error);
                return {
                    error: {
                        status: result.error.status,
                        message: result.error.message,
                    },
                };
            }

            return {
                data: result,
            };

        } catch (error) {
            console.error('Fetch error:', error);
            return {
                error: {
                    status: 'FETCH_ERROR',
                    message: error.message || 'An unknown error occurred',
                },
            };
        }
    };

export const baseApi = createApi({
    baseQuery: customBaseQuery(),
    reducerPath: "baseApi",
    tagTypes: ["Auth", "User", "Post", "UserWidget", "Bookmark"],
    keepUnusedDataFor: 30,
    endpoints: (builder) => ({}),
});
