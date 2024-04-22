import axios from "axios";

// Create a new Axios instance with a base URL
const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",  // Base URL for all requests
});

// Request interceptor: Modify the outgoing request before it is sent
axiosClient.interceptors.request.use((config) => {
    // Retrieve the access token from local storage
    const token = localStorage.getItem("ACCESS_TOKEN");
    
    // Set the Authorization header with the fetched token for authentication
    config.headers.Authorization = `Bearer ${token}`;
    
    // Return the modified request configuration
    return config;
});

// Response interceptor: Handle responses and errors from the server
axiosClient.interceptors.response.use(
    // Handle successful responses
    (response) => {
        // Log the response (commented out in this case)
        // console.log(response);
        
        // Return the response data
        return response;
    },
    // Handle errors
    (error) => {
        try {
            // Destructure the error object to get the response
            const { response } = error;
            
            // If the response status is 401 (Unauthorized), remove the access token from local storage
            if (response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (err) {
            // Log any errors that occur during the process
            console.error(err);
        }
        
        // Throw the error to be caught by the calling function
        throw error;
    }
);

// Export the configured axiosClient instance
export default axiosClient;