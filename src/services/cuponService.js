import Service from "./Service";

const resource = 'cupons';

export default {
    getCupon(cupon){
        return Service.get(resource + '/' + cupon);
    },
    get(){
        return Service.get(resource);
    }
}