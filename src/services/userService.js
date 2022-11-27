import Service from "./Service";

const resource = 'store';

export default {
    check(user, password){
        return Service.post(resource + '/login', {
            email: user,
            password: password
        });
    },
    getInfo(id, token){
        return Service.get(resource + '/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    updateInfo(id, data, token){
        console.log('Name: ' + data);
        return Service.patch(resource + '/' + id, data, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    createUser(data){
        return Service.post(resource + '/register', data);
    },
    getAllUsers(token){
        return Service.get(resource + '/', { headers: {"Authorization" : `Bearer ${token}`} });
    },
    deleteUser(id, token){
        return Service.delete(resource + '/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    patchUserToAdmin(id, admin, token){
        return Service.patch(resource + '/' + id, {isAdmin: admin}, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}