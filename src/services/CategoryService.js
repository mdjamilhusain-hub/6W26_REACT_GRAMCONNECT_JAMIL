import CategoryModel from '../models/CategoryModel'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'

// CRUD - Create, Read, Update, delete
const dbPath = "categories"

class CategoryService {

    async add(data) {
        let newCategory = new CategoryModel();
        newCategory.name = data.name;
        newCategory.description = data.description;
        const docRef = await addDoc(collection(db, dbPath), { ...newCategory })
        return docRef;
    }


    async all() {
        const querySnapshot = await getDocs(collection(db, dbPath));
        let categories = []
        querySnapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() })
        });
        return categories;
    }

    async single(id) {
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log("No such document!");
            return false
        }
    }


    async update(data, id) {
        const docRef = doc(db, "categories", id);
        await updateDoc(docRef, data);
    }


    async deleteCat(id) {
        const docRef = doc(db, dbPath, id);
        await deleteDoc(docRef)
    }
}


export default new CategoryService;