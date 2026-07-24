import ComplaintModel from '../models/ComplaintModel'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'

// CRUD - Create, Read, Update, delete
const dbPath = "complaints"

class ComplaintService {

    async add(data) {
        let newComplaint = new ComplaintModel();
        newComplaint.userId = data.userId;
        newComplaint.categoryId = data.categoryId;
        newComplaint.title = data.title;
        newComplaint.description = data.description;
        newComplaint.image = data.image;
        newComplaint.location = data.location;
        newComplaint.priority = data.priority;
        newComplaint.complaintStatus = data.complaintStatus;
        const docRef = await addDoc(collection(db, dbPath), { ...newComplaint })
        return docRef;
    }

    async all() {
        const querySnapshot = await getDocs(collection(db, dbPath));
        let complaints = []
        querySnapshot.forEach((doc) => {
            complaints.push({ id: doc.id, ...doc.data() })
        });
        return complaints;
    }

    async getByUser(userId) {
        const querySnapshot = await getDocs(collection(db, dbPath));
        let complaints = []
        querySnapshot.forEach((doc) => {
            if (doc.data().userId === userId) {
                complaints.push({ id: doc.id, ...doc.data() })
            }
        });
        return complaints;
    }

    async single(id) {
        const docRef = doc(db, dbPath, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log("No such document!");
            return false
        }
    }

    async update(data, id) {
        const docRef = doc(db, dbPath, id);
        await updateDoc(docRef, data);
    }

    async deleteComplaint(id) {
        const docRef = doc(db, dbPath, id);
        await deleteDoc(docRef);
    }
}

export default new ComplaintService();