export default class ComplaintModel{
    userId= ""
    categoryId= ""
    title= ""
    description= ""
    image= ""
    location= ""
    priority= "Low" // Low/Medium/High
    complaintStatus= "Pending" // Pending/In Progress/Resolved/ Rejected
    createdAt= Date.now()
    updatedAt= ""
}