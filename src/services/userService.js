import axios from "axios";


class UserService {
    static loggIn = (body) => axios.post('/auth/login', body)
}

export default UserService;