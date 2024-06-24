import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  covidData: any;
  delta: any;
  Url = 'https://data.covid19india.org/v4/min/data.min.json'
  total:any;
  date:any;



  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    this.fetchData();
    this.renderChart();
  }

  renderChart(){
    const barChart = new Chart("barchart", {
      type: 'bar',
      data: {
        labels: ['MP', 'UP', 'RJ', 'AN', 'CH', 'DL'],
        datasets: [{
          label: 'Bar chart COVID-19',
          data: [
            this.covidData.MP.delta.confirmed,
            this.covidData.UP.delta.confirmed,
            this.covidData.RJ.delta.confirmed,
            this.covidData.AN.delta.confirmed,
            this.covidData.CH.delta.confirmed,
            this.covidData.DL.delta.confirmed,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });


    const pieChart =  new Chart("piechart", {
    type: 'pie',
    data: {
      labels: ['MP', 'UP', 'RJ', 'AN', 'CH', 'DL'],
      datasets: [{
        label: 'list od states',
        data: [
          this.covidData.MP.total.confirmed,
          this.covidData.UP.total.confirmed,
          this.covidData.RJ.total.confirmed,
          this.covidData.AN.total.confirmed,
          this.covidData.CH.total.confirmed,
          this.covidData.DL.total.confirmed,
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  }

  dateFormat(dateString: string): string {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' } as const;
    return date.toLocaleDateString('en-US', options);
  }

  fetchData() {
    this.http.get<any>(this.Url).subscribe(data => {
      this.covidData = data;
      console.log(this.covidData);
      console.log(data.AN.delta.confirmed);
      this.delta = data.MP.delta.confirmed;
      this.total = data.MP.total;
      this.date = data.MP.meta.date;
    });
  }
}
