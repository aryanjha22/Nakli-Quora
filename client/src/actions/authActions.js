import {GET_ERRORS, SET_CURRENT_USER} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'


// Register User

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
      .then(res => history.push('/'))
      .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )

}


//Login -Get User

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res =>{
            //Save
            const {token} = res.data
            //Set token to local storage
            localStorage.setItem('jwtToken', token)
            //Set token to auth header
            setAuthToken(token)
            //Decode token to get user data
            const decoded = jwt_decode(token)
            //set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//Set logged in user
export const setCurrentUser = (decoded) =>{
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//LogOut user
 export const logoutUser = () => dispatch => {
     //Remove token from local storage
     localStorage.removeItem('jwtToken')
     //Remove auth header for future requests
     setAuthToken(false)
     //Set current user to empty {} which will set isAuthenctiated to false
     dispatch(setCurrentUser({}))
 }