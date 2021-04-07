import axios from 'axios'
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from '../../Constants/UserConstants/UpdateUserDataConstants'

export const updateProfile = (name,email) => async (dispatch) => {
    try{
        dispatch({
            type:UPDATE_PROFILE_REQUEST
        })

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.put('/api/v1/auth/updatedetails',{email,name},config)


        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data
        })
    }catch (error) {
        console.log(error.response);
        dispatch({
          type: UPDATE_PROFILE_FAIL,
          payload: error.response.data.error
            ? error.response.data.error
            : error.data.error,
        });
      }
}

export const updatePassword = (currentPassword,newPassword) => async (dispatch) => {
    try{
        dispatch({
            type:UPDATE_PASSWORD_REQUEST
        })

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

         await axios.put('/api/v1/auth/updatepassword',{currentPassword,newPassword},config)
       

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            
        })
    }catch (error) {
        console.log(error);
        dispatch({
          type: UPDATE_PASSWORD_FAIL,
          payload: error.response.data.error
            ? error.response.data.error
            : error.data.error,
        });
      }
}