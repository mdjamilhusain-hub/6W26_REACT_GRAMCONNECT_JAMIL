import EventModel from "../models/EventModel";
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

const dbPath = "events";

class EventService {

    async add(data) {

        let event = new EventModel();

        event.title = data.title;
        event.description = data.description;
        event.location = data.location;
        event.eventDate = data.eventDate;
        event.status = "Active";
        event.createdAt = Date.now();
        event.updatedAt = "";

        return await addDoc(
            collection(db, dbPath),
            { ...event }
        );
    }

    async all() {

        const querySnapshot = await getDocs(collection(db, dbPath));

        let events = [];

        querySnapshot.forEach((doc) => {
            events.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return events;
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

    async deleteEvent(id) {

        return await deleteDoc(
            doc(db, dbPath, id)
        );
    }
}

export default new EventService();
