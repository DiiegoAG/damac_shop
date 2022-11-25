import Service from "./Service";

const resource = 'categories';

export default {
    get (){
        return Service.get(resource);
    }
}