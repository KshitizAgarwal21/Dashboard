import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AuthServiceService } from 'src/app/services/auth-service.service';

let days: Array<String>=[];
let sumWhatsapp: number;
let sumYoutube:  number;
let sumInstagram: number;
@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
Highcharts = Highcharts;
chartOptions: any;
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    days=[];
    sumYoutube=0;
    sumWhatsapp = 0;
    sumInstagram = 0;
    if(localStorage.getItem('token')!=null)
    {
        this.authService.getData().subscribe(res=>{
    
            res.result.usage.forEach((element:any) => {
                
                days.push(element.day)
                sumWhatsapp+= element.whatsapp;
                sumYoutube+= element.youtube;
                sumInstagram+= element.insta;
            });
            if(res!=null){
              this.chartOptions={
                chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
              },
              title: {
                text: 'Screen On time for user'
              },
              tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              accessibility: {
                point: {
                    valueSuffix: '%'
                }
              },
              credits:{
              
              enabled: false
              },
              plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
              },
              series: [{
                name: 'Usage',
                colorByPoint: true,
                data: [{
                    name: 'WhatsApp',
                    y: sumWhatsapp,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Instagram',
                    y: sumInstagram
                }, {
                    name: 'YouTube',
                    y: sumYoutube
                }]
              }],
              responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            }


              }
            }
              
          }, err=>{
            console.log(err.error);}) 
  }
  else{
    this.chartOptions={
      chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Screen On time for user'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
          valueSuffix: '%'
      }
    },
    credits:{
    
    enabled: false
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
    },
    series: [{
      name: 'Usage',
      colorByPoint: true,
      data: [{
          name: 'WhatsApp',
          y: sumWhatsapp,
          sliced: true,
          selected: true
      }, {
          name: 'Instagram',
          y: sumInstagram
      }, {
          name: 'YouTube',
          y: sumYoutube
      }]
    }]
    }
  }
  }
}
