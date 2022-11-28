import Service from "./Service";

const resource = 'reports';
export default {
    getReportPerMonth(numMes, year){
        return Service.get(resource + '/purchases/byMonth/' + numMes + '/byYear/' + year);
    },
    getReportPerYear(year){
        return Service.get(resource + '/purchases/byYear/' + year);
    }
}