import SchemeApplicationModel from "../models/SchemeApplicationModel";

import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

const dbPath = "schemeApplications";

class SchemeApplicationService {

    async add(data) {

        let application = new SchemeApplicationModel();

        application.userId = data.userId;
        application.schemeId = data.schemeId;
        application.documentUrl = data.documentUrl;
        application.applicationStatus = "Pending";
        application.remarks = "";
        application.createdAt = Date.now();
        application.updatedAt = "";

        return await addDoc(
            collection(db, dbPath),
            { ...application }
        );
    }

    async all() {

        const querySnapshot = await getDocs(collection(db, dbPath));

        let applications = [];

        querySnapshot.forEach((doc) => {
            applications.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return applications;
    }

    async getByUser(userId) {

        const list = await this.all();

        return list.filter(
            (x) => x.userId === userId
        );
    }

    async getByScheme(schemeId) {

        const list = await this.all();

        return list.filter(
            (x) => x.schemeId === schemeId
        );
    }

    async single(id) {

        const docSnap = await getDoc(
            doc(db, dbPath, id)
        );

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
}

export default new SchemeApplicationService();