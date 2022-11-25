import Service from "./Service";

const resource = 'purchases';

export default {
    getPurchases(id, token){
        return Service.get(resource + '/byUser/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    newPurchase(idUser, address, total, discount, date, method_payment, products, cardNumber, token){
        return Service.post(resource, {
            idUser: idUser,
            address: address,
            total: total,
            discount: discount,
            date: date,
            method_payment: method_payment,
            products: products,
            cardNumber: cardNumber,
            token: token
        }, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}