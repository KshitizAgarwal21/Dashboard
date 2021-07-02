import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_stock from 'highcharts/modules/stock';
import { AuthServiceService } from 'src/app/services/auth-service.service';
let days: Array<String>=[];
let whatsapp: Array<number>=[];
let youtube:  Array<number>=[];
let instagram: Array<number>=[];
@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})

export class AreaComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: any;
  
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
                  categories: days,
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
                  data: whatsapp,
              }, {
                  name: 'Instagram',
                  data: instagram
              },
          {
              name: 'YouTube',
              data: youtube
          },
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    chart: {
                        height: 300
                    },
                    subtitle: {
                        text: null
                    },
                    navigator: {
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
        
    })

  }
  else
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
          categories: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
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
          data: [0,0,0,0,0,0,0],
      }, {
          name: 'Instagram',
          data: [0,0,0,0,0,0,0],
      },
      
  {
      name: 'YouTube',
      data: [0,0,0,0,0,0,0],
  },
],
responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            chart: {
                height: 300
            },
            subtitle: {
                text: null
            },
            navigator: {
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


