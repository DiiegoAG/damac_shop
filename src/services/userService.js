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
    }
}