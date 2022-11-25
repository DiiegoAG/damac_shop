import Service from "./Service";

const resource = 'cards';

export default {
    getCards(id, token){
        return Service.get(resource + '/byuser/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    deleteCard(id, token){
        return Service.delete(resource + '/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    newCard(data, token){
        return Service.post(resource + '/', data ,{ headers: {"Authorization" : `Bearer ${token}`} });
    },
    updateCard(id, data, token){
        return Service.patch(resource + '/' + id, data, { headers: {"Authorization" : `Bearer ${token}`} })
    }
}