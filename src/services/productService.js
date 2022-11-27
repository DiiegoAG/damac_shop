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
    createProduct(data, token){
        return Service.post(resource, data, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    delete(id, token){
        return Service.delete(resource + '/' + id, { headers: {"Authorization" : `Bearer ${token}`} });
    },
    update(id, name,description, price, available_items, available, flavor, measure, quantity, filing ,brand, category, gallery, token){
        return Service.patch(resource + '/' + id, {
            name: name,
            description: description,
            price: price,
            available_items: available_items,
            available: available,
            flavor: flavor,
            measure: measure,
            quantity: quantity,
            filing: filing,
            brand: brand,
            category: category,
            gallery: gallery
        }, { headers: {"Authorization" : `Bearer ${token}`} });
    }
}