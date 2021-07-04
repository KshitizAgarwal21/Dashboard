import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import { AuthServiceService } from 'src/app/services/auth-service.service';
let days: Array<String>=[];
let whatsapp: Array<number>=[];
let youtube:  Array<number>=[];
let instagram: Array<number>=[];

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
chartOptions: any;
Highcharts =  Highcharts;
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    days=[];
whatsapp=[],
instagram=[];
youtube=[];
if(localStorage.getItem('token')!=null)
{
    this.authService.getData().subscribe(res=>{

        res.result.usage.forEach((element:any) => {
            
            days.push(element.day)
            whatsapp.push(element.whatsapp)
            instagram.push(element.insta)
            youtube.push(element.youtube)
        });
        if(res!=null)
        {
            this.chartOptions={
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Weekly Screen on time'
                },
                subtitle: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    categories: days,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Duration (minutes)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} minutes</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'WhatsApp',
                    data: whatsapp
            
                }, {
                    name: 'Instagram',
                    data: instagram
            
                }, {
                    name: 'YouTube',
                    data: youtube
            
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
              HC_stock(Highcharts);
              setTimeout(()=>{
                window.dispatchEvent(
                  new Event('resize')
                );
              },300)
        }
        
    }, err=>{
        console.log(err.error);})

  }
  else
  {
    this.chartOptions={
        chart: {
            type: 'column'
        },
        title: {
            text: 'Weekly Screen on time'
        },
        subtitle: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: days,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Duration (minutes)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} minutes</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'WhatsApp',
            data: [0,0,0,0,0,0,0]
    
        }, {
            name: 'Instagram',
            data: [0,0,0,0,0,0,0]
    
        }, {
            name: 'YouTube',
            data: [0,0,0,0,0,0,0]
    
        }, ],
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
