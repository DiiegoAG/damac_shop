//Importamos AXIOS para poder usarlo después
import axios from "axios";

//Declaramos nuestra URL base para acceder a ella y solo cambiar los ENDPOINTS
const baseURL = 'http://localhost:3000/api/v1/';

//Exportamos el servicio de Axios para usarlo dentro de los servicios individuales
export default axios.create({
    baseURL,
});