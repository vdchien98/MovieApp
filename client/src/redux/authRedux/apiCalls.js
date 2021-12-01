import { loginFailure, loginStart, loginSuccess, logOut } from './authRedux';
import { updateUserStart, updateUserSuccess, updateUserFailure } from './authRedux';
import { publicRequest, userRequest } from '../../requestMethods';

// Login
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
        console.log(res.data);
        return res.data;
    } catch (err) {
        dispatch(loginFailure());
        return err;
    }
};
// Logout
export const logout = async (dispatch) => {
    dispatch(logOut());
};

export const updateUser = async (id, updateUser, dispatch) => {
    dispatch(updateUserStart());
    try {
        // update
        await userRequest.put(`/users/${id}`, updateUser);
        dispatch(updateUserSuccess());
    } catch (err) {
        dispatch(updateUserFailure(err));
    }
};
