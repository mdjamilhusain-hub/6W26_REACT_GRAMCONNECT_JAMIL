export default class UserModel {
    id = ""
    name = ""
    email = ""
    phone = ""
    address = ""
    userType = 2 // 1 - ADMIN, 2 - Villager
    profileImage = ""
    createdAt = Date.now()
    status = true;
}