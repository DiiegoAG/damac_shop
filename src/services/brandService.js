import Service from "./Service";

const resource = 'brands';

export default {
    get (){
        return Service.get(resource);
    }
}