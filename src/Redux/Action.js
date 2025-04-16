import axios from "axios";
import { toast } from "react-toastify";
import { 
    ADD_USER, DELETE_USER, FAIL_REQUEST, GET_USER_LIST, 
    GET_USER_OBJ, MAKE_REQUEST, UPDATE_USER 
} from "./ActionType";

export const makeRequest = () => ({ type: MAKE_REQUEST });
export const failRequest = (err) => ({ type: FAIL_REQUEST, payload: err });
export const geUserList = (data) => ({ type: GET_USER_LIST, payload: data });
export const deleteUser = () => ({ type: DELETE_USER });
export const addUser = () => ({ type: ADD_USER });
export const updateUser = () => ({ type: UPDATE_USER });
export const getUserObj = (data) => ({ type: GET_USER_OBJ, payload: data });

const BASE_URL = "http://127.0.0.1:8000/users";

// Fetch User List
export const FetchUserList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get(BASE_URL)
            .then((res) => dispatch(geUserList(res.data)))
            .catch((err) => dispatch(failRequest(err.message)));
    };
};

// Remove User
export const RemoveUser = (id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.delete(`${BASE_URL}/${id}`)  // Fixed missing backticks
            .then(() => dispatch(deleteUser()))
            .catch((err) => dispatch(failRequest(err.message)));
    };
};

// Add User
export const FunctionAddUser = (data) => {
  return (dispatch) => {
      dispatch(makeRequest());

      console.log("User Data to Send:", data); // Debugging step

      axios.post("http://127.0.0.1:8000/users", data, {
          headers: { "Content-Type": "application/json" },
      })
      .then(() => {
          dispatch(addUser());
          toast.success("User added successfully.");
      })
      .catch((err) => {
          console.error("Error:", err.response?.data); // Log full error response
          dispatch(failRequest(err.message));
      });
  };
};






// Update User
export const FunctionUpdateUser = (data, id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.put(`${BASE_URL}/${id}`, data)  // Fixed missing backticks
            .then(() => {
                dispatch(updateUser());
                toast.success("User updated successfully.");
            })
            .catch((err) => dispatch(failRequest(err.message)));
    };
};

// Fetch Single User
export const FetchUserObj = (id) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get(`${BASE_URL}/${id}`)  // Fixed missing backticks
            .then((res) => dispatch(getUserObj(res.data)))
            .catch((err) => dispatch(failRequest(err.message)));
    };
};

// Load User from Different Endpoint
export const loadUser = () => {
    return (dispatch) => {
        dispatch({ type: "LOAD_USER_REQUEST" });
        fetch("http://127.0.0.1:8000/trainer")
            .then((response) => response.json())
            .then((data) => dispatch({ type: "LOAD_USER_SUCCESS", payload: data }))
            .catch((error) => dispatch({ type: "LOAD_USER_FAILURE", error }));
    };  
};
