import Service from "./Service";

const resource = 'shippingInfo';

export default{
    getAddresses(id, token){
        return Service.get(resource + '/byuser/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    deleteAddress(id, token){
        return Service.delete(resource + '/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    updateAddress(id, data, token){
        return Service.patch(resource + '/' + id, data, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    newAddress(data, token){
        return Service.post(resource, data, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}