import Service from "./Service";

const resource = 'categories';

export default {
    get (){
        return Service.get(resource);
    },
    createCategory(name, token){
        return Service.post(resource, {name: name}, { headers: {"Authorization" : `Bearer ${token}`} })
    }
}