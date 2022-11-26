import Service from "./Service";

const resource = 'purchases';

export default {
    getPurchases(id, token){
        return Service.get(resource + '/byUser/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    newPurchase(idUser, name, address, total, discount, date, method_payment, products, cardNumber, token){
        return Service.post(resource, {
            idUser: idUser,
            name: name,
            address: address,
            total: total,
            discount: discount,
            date: date,
            method_payment: method_payment,
            products: products,
            cardNumber: cardNumber,
            token: token
        }, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    newPurchaseNameless(name, address, total, discount, date, method_payment, products, cardNumber, token){
        return Service.post(resource, {
            name: name,
            address: address,
            total: total,
            discount: discount,
            date: date,
            method_payment: method_payment,
            products: products,
            cardNumber: cardNumber,
            token: token
        }, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    getOnePurchase(id){
        return Service.get(resource + '/' + id);
    }
}