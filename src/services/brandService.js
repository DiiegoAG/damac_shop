import Service from "./Service";

const resource = 'brands';

export default {
    get (){
        return Service.get(resource);
    },
    createBrand(name, token){
        return Service.post(resource, {name: name}, { headers: {"Authorization" : `Bearer ${token}`} })
    }
}