import GovernmentSchemeModel from "../models/GovernmentSchemeModel";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const dbPath = "governmentSchemes";

class GovernmentSchemeService {

    async add(data) {

        let scheme = new GovernmentSchemeModel();

        scheme.title = data.title;
        scheme.description = data.description;
        scheme.eligibility = data.eligibility;
        scheme.benefits = data.benefits;
        scheme.lastDate = data.lastDate;
        scheme.status = "Active";
        scheme.createdAt = Date.now();
        scheme.updatedAt = "";

        return await addDoc(
            collection(db, dbPath),
            { ...scheme }
        );
    }

    async all() {

        const querySnapshot = await getDocs(collection(db, dbPath));

        let schemes = [];

        querySnapshot.forEach((doc) => {
            schemes.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return schemes;
    }

    async single(id) {

        const docRef = doc(db, dbPath, id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            };
        }

        return false;
    }

    async update(data, id) {

        return await updateDoc(
            doc(db, dbPath, id),
            {
                ...data,
                updatedAt: Date.now(),
            }
        );
    }

    async deleteScheme(id) {

        return await deleteDoc(
            doc(db, dbPath, id)
        );
    }
}

export default new GovernmentSchemeService();