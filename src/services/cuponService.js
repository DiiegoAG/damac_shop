import Service from "./Service";

const resource = 'cupons';

export default {
    getCupon(cupon){
        return Service.get(resource + '/' + cupon);
    },
    get(){
        return Service.get(resource);
    },
    createCupon(data, token){
        return Service.post(resource, data, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    updateCupon(id, data, token){
        return Service.patch(resource + '/' + id, data, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    deleteCupon(id, token){
        return Service.delete(resource + '/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}