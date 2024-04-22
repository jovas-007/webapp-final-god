import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { UserStatsService } from 'src/app/services/user-stats.service';

// Interfaz para los datos de las gráficas de Chart.js
interface ChartData {
  // Establece los datos de las gráficas de tipo bar, pie y doughnut
  labels: string[];
  datasets: ChartDataset[];
}

// Interfaz para los datasets de las gráficas de Chart.js (bar, pie, doughnut)
interface ChartDataset {
  // Establece los datos de los datasets de las gráficas
  // Estos datos son dinámicos y se actualizaran automáticamente
  data: number[];
  label: string;
  backgroundColor: string | string[];
}

@Component({
  selector: 'app-graficas-screen',
  templateUrl: './graficas-screen.component.html',
  styleUrls: ['./graficas-screen.component.scss'],
})
export class GraficasScreenComponent implements OnInit {
  

  // Bar Chart for user counts
  barChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [],
        label: 'Cantidad de Usuarios',
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
      },
    ],
  };

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  barChartPlugins = [DatalabelsPlugin];

  pieChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí y se agregan automaticamente
        label: 'Registro de usuarios',
        backgroundColor: ['#FCFF44', '#F1C8F2', '#31E731'],
      },
    ],
  };

  pieChartOption = {
    responsive: true,
  };

  pieChartPlugins = [DatalabelsPlugin];

  doughnutChartData: ChartData = {
    labels: ['Administradores', 'Maestros', 'Alumnos'],
    datasets: [
      {
        data: [], // Datos dinámicos irán aquí y se actualizan automaticamente
        label: 'Registro de usuarios',
        backgroundColor: ['#F88406', '#FCFF44', '#31E7E7'],
      },
    ],
  };

  doughnutChartOption = {
    responsive: true,
  };

  doughnutChartPlugins = [DatalabelsPlugin];

  // Inyectar el servicio de UserStatsService en el constructor  
  constructor(
    private userStatsService: UserStatsService,
    private cdr: ChangeDetectorRef 
    // Inyectar ChangeDetectorRef para forzar la actualización de las gráficas
  ) {}

  // Llama a la función para cargar los datos de los usuarios al iniciar el componente
  ngOnInit(): void {
    this.loadUserStats();
  }

  loadUserStats() {
    this.userStatsService.getUserCounts().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); 
        this.updateChartData(data);
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Error al obtener datos de usuarios', error);
      },
    });
  }

  updateChartData(data: any) {
    // Actualiza los datos de las gráficas aquí de manera dinámica
    //estos datos los recolocamos en el arreglo de data
    this.pieChartData.datasets[0].data = [
      data.admins,
      data.maestros,
      data.alumnos, 
    ];
    this.doughnutChartData.datasets[0].data = [
      data.admins,
      data.maestros,
      data.alumnos,
    ];
    this.barChartData.datasets[0].data = [
      data.admins,
      data.maestros,
      data.alumnos, 
    ];

    // Forzar la actualización de las gráficas
    this.pieChartData = { ...this.pieChartData };
    this.doughnutChartData = { ...this.doughnutChartData };
    this.barChartData = { ...this.barChartData };
    this.cdr.detectChanges();
  }
}



