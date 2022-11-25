import Service from "./Service";

const resource = 'products';

export default {
    get (){
        return Service.get(resource);
    },
    getOne(id){
        return Service.get(resource + '/' + id);
    },
    getByCategory(id){
        return Service.get(resource + '/byCategory/' + id);
    },
    getByBrand(id){
        return Service.get(resource + '/byBrand/' + id);
    },
    create(data){
        return Service.post(resource, data);
    },
    delete(id){
        return Service.delete(resource, id);
    },
    update(data){
        return Service.put(resource, data);
    }
}