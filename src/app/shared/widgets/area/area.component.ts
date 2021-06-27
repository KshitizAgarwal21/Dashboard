import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: any;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
    {
    this.chartOptions={
      chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Average screen on time per app during one week'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        //backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
    },
    yAxis: {
        title: {
            text: 'Time (minutes)'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' minutes'
    },
    credits: {
        enabled: false
    },
    exporting: {
      enabled: true
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'WhatsApp',
        data: [20, 25, 22, 30, 60, 15, 45]
    }, {
        name: 'Instagram',
        data: [50, 60, 40, 30, 70, 120, 100]
    },
{
    name: 'YouTube',
    data: [80, 100, 40, 25, 30, 120, 90 ]
}]
    };
    HC_stock(Highcharts);
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300)
  }
  else{
    this.chartOptions={
      chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Average screen on time per app during one week'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        //backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ],
        plotBands: [{ // visualize the weekend
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
        }]
    },
    yAxis: {
        title: {
            text: 'Time (minutes)'
        },
        
    },
    tooltip: {
        shared: true,
        valueSuffix: ' minutes'
    },
    credits: {
        enabled: false
    },
    exporting: {
      enabled: true
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'WhatsApp',
        data: [20, 25, 22, 30, 60, 15, 45]
    }, {
        name: 'Instagram',
        data: [50, 60, 40, 30, 70, 120, 100]
    },
{
    name: 'YouTube',
    data: [80, 100, 40, 25, 30, 120, 90 ]
}]
    };
    HC_stock(Highcharts);
    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300)

  }
}

}
