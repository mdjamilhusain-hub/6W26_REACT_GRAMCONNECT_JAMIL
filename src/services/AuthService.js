import { signOut } from "firebase/auth";

import {auth} from '../firebase/firebaseConfig'

class AuthService{
    async setData(data){
        localStorage.setItem("id", data.id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType);
    }

    getEmail(){
        return localStorage.getItem("email")
    }

    getUserType(){
         return localStorage.getItem("userType")
    }

    logout(){
        localStorage.clear()
        sessionStorage.clear()
        signOut(auth)
    }
}

export default new AuthService