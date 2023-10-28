import axios from "axios"

const API_URL= "https://slope-emporium-app-b7686b574df7.herokuapp.com/users/authenticate"

class AuthService{
    login(username: string, password: string){
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response =>{
                if(response.data.accessToken){
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout(){
        sessionStorage.removeItem("user");
    }

    register(username: string,email: string, password:string){
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser(){
        const userStr = localStorage.getItem("user");
        if(userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();
