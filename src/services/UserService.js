import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase/firebaseConfig"
import UserModel from "../models/UserModel"
import { collection, doc, deleteDoc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import AuthService from './AuthService'



const dbPath = "users"

class UserService {
    async register(payload) {
        const userRegister = await createUserWithEmailAndPassword(auth, payload.email, payload.password)

        let newUser = new UserModel()
        newUser.name = payload.name;
        newUser.email = payload.email;
        newUser.phone = payload.phone;
        newUser.address = payload.address;
        newUser.userType = 2;
        newUser.id = userRegister.user.uid

        await setDoc(doc(db, dbPath, userRegister.user.uid), { ...newUser })

        console.log("User register data: ", userRegister.user)
    }


    async login(data) {
        console.log("Da: ", data);
        
        const authRes = await signInWithEmailAndPassword(auth, data.email, data.password)
        
        const docRef = doc(db, dbPath, authRes.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data()
        console.log(userData);
        if (docSnap.exists()) {
            let authData = {
                id: authRes.user.uid,
                name: userData.name,
                email: userData.email,
                token: userData.accessToken,
                userType: userData.userType
            }
            await AuthService.setData(authData)
            return authData;
        } else {
          throw new Error("User not found")
        }

    }

    async all() {
        let q = query(collection(db, dbPath), where("userType", "==", 2))
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() })
        });
        return users;
    }

    async single(id) {
        const docRef = doc(db, dbPath, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return false;
    }

    async update(data, id) {
        const docRef = doc(db, dbPath, id);
        await updateDoc(docRef, { ...data });
    }

    async deleteUser(id) {
        const docRef = doc(db, dbPath, id);
        await deleteDoc(docRef);
    }
}

export default new UserService