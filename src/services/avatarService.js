import Service from "./Service";

const resource = 'avatarsImg';

export default {
    getImages(){
        return Service.get(resource);
    }
}