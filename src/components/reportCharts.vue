<template>
    <select class="form-control" v-model="reportToShow">
                    <option value="Linea">Reporte por Año</option>
                    <option value="Barra">Reporte por Mes</option>
                </select>
    <br>
    <div v-show="reportToShow == 'Linea'">
        <div class="row">
            <div class="col-lg-12">
                <h3>Agregar Año a la Gráfica</h3>
            </div>
            <div class="col-lg-4">
                <select class="form-control" v-model="yearToAdd">
                    <option value="2021">2021</option>
                </select>
            </div>
            <div class="col-lg-3">
                <button class="blue_btn" v-on:click.prevent="addLineToChart()">Agregar</button>
            </div>
            <div class="col-lg-5">
                <button class="blue_btn" v-on:click.prevent="updateChart()">Refrescar Gráfico</button>
            </div>
        </div>
        <br>
        <br>
        <h3 style="text-align: center;">Total de Productos Vendidos</h3>
        <canvas id="myChart" height="400" width="400"></canvas>
        <hr>
        <div class="row">
            <div class="col-lg-6 midd" v-for="year,index in total" :key="index">
                <h3 class="orange">Total de las Ventas en 2022
                    <br><span class="black">${{year.total}}</span></h3>
                <hr>
                <h3 class="orange">Productos Vendidos
                    <br><span class="black">{{year.count}}</span></h3>
                <br>
            </div>
        </div>
    </div>
    <div v-show="reportToShow == 'Barra'">
        <div class="row">
            <div class="col-lg-12">
                <h3>Agregar Mes a la Gráfica</h3>
            </div>
            <div class="col-lg-3">
                <select class="form-control" v-model="monthToAdd">
                    <option value="1">ENERO</option>
                    <option value="2">FEBRERO</option>
                    <option value="3">MARZO</option>
                    <option value="4">ABRIL</option>
                    <option value="5">MAYO</option>
                    <option value="6">JUNIO</option>
                    <option value="7">JULIO</option>
                    <option value="8">AGOSTO</option>
                    <option value="9">SEPTIEMBRE</option>
                    <option value="10">OCTUBRE</option>
                    <option value="11">NOVIEMBRE</option>
                    <option value="12">DICIEMBRE</option>
                </select>
                <input type="number" class="form-control" v-model="yearToAddM" placeholder="Año"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Año'">
            </div>
            <div class="col-lg-3">
                <button class="blue_btn" v-on:click.prevent="addToBarChart()">Agregar</button>
            </div>
            <div class="col-lg-5">
                <button class="blue_btn" v-on:click.prevent="updateChart()">Refrescar Gráfico</button>
            </div>
        </div>
        <br>
        <br>
        <h3 style="text-align: center;">Total de Ventas por Mes</h3>
        <canvas id="month" height="400" width="400"></canvas>
    </div>
</template>

<script>
let lineChart;
let barChart;
import Chart from 'chart.js/auto'
import reportService from '@/services/reportService';

export default {
    name: 'Reports',
    data() {
        return {
            yearToAdd: null,
            reportsPerYear: [],
            myChart: null,
            total: [],
            reportToShow: null,
            monthToAdd: null,
            yearToAddM: null,
            countM: null,
            totalM: 0
        }
    },
    mounted() {
        this.getReportPerYear();
        this.createGraph();
    },
    methods: {
        getReportPerYear(){
            for (let index = 0; index < 12; index++) {
                reportService.getReportPerMonth(index + 1, 2022).then(res => {
                    if(res.data.count){
                        this.reportsPerYear[index] = res.data?.count;
                    }
                    else{
                        this.reportsPerYear[index] = 0;
                    }
                })
            }
        },
        createGraph() {
            lineChart = new Chart(
                document.getElementById('myChart'),
                {
                    type: 'line',
                    data: {
                        labels: [
                            'Enero',
                            'Febrero',
                            'Marzo',
                            'Abril',
                            'Mayo',
                            'Junio',
                            'Julio',
                            'Agosto',
                            'Septiembre',
                            'Octubre',
                            'Noviembre',
                            'Diciembre'
                        ],
                        datasets: [{
                            label: 'Compras en el Año 2022',
                            backgroundColor: 'black',
                            borderColor: '#d65a31',
                            color: 'rgb(200, 31, 200)',
                            data: this.reportsPerYear
                        },]
                    },
                    options: {}
                }
            );
            barChart = new Chart(
                document.getElementById('month'),
                {
                    type: 'bar',
                    data: {
                        labels: ['Total de Ventas por Mes'],
                        datasets: []
                    },
                    options: {}
                }
            );
        },
        addLineToChart(){
            var newYear = [];
            for (let index = 0; index < 12; index++) {
                reportService.getReportPerMonth(index + 1, parseInt(this.yearToAdd)).then(res => {
                    if(res.data.count){
                        newYear[index] = res.data?.count;
                    }
                    else{
                        newYear[index] = 0;
                    }
                })
            }
            lineChart.data.datasets.push({
                label: 'Compras en el Año ' + this.yearToAdd,
                backgroundColor: 'black',
                borderColor: '#212831',
                color: 'rgb(300, 31, 200)',
                data: newYear
            });
            this.updateChart();
        },
        getTotalPerYear(year){
            reportService.getReportPerYear(year).then(res => {
                this.total.push({
                    count: res.data[0].count,
                    total: res.data[0].total
                });
            })
        },
        updateChart(){
            lineChart.update();
            barChart.update();
        },
        
        addToBarChart(){
            var a;
            reportService.getReportPerMonth(parseInt(this.monthToAdd), this.yearToAddM).then(res => {
                a = res.data.total;
                const allMonths = [
                    "ENERO",
                    "FEBRERO",
                    "MARZO",
                    "ABRIL",
                    "MAYO",
                    "JUNIO",
                    "JULIO",
                    "AGOSTO",
                    "SEPTIEMBRE",
                    "OCTUBRE",
                    "NOVIEMBRE",
                    "DICIEMBRE"];
                barChart.data.datasets.push({
                    "label": [allMonths[(this.monthToAdd - 1)] + ' del ' + this.yearToAddM],
                    "data": [a],
                    "backgroundColor": [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(201, 203, 207, 0.2)"
                    ],
                    "borderColor": [
                        "rgb(255, 99, 132)"
                    ],
                    "borderWidth": 1
                })
            })
        }
    },
}
</script>

<style>
.blue_btn {
    line-height: 38px;
    background: #212831;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    padding: 0px 40px;
    display: inline-block;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: 500;
}
.col-lg-6.midd {
    text-align: center;
}
.orange{
    color: #d75b31;
}
.black{
    color: black;
}
</style>