import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "slope-emporium-app-b7686b574df7.herokuapp.com/users/"

class UserService{
    getAdminBoard(){
        return axios.get(API_URL + 'allUsers', {
            headers: authHeader()
        });
    }
}