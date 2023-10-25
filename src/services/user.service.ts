import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "localhost:8080/users/"

class UserService{
    getAdminBoard(){
        return axios.get(API_URL + 'allUsers', {
            headers: authHeader()
        });
    }
}