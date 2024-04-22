import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from '../../services/materias.service';
import { EliminarMateriaModalComponent } from '../../modals/eliminar-materia-modal/eliminar-materia-modal.component';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss'],
})
export class MateriasScreenComponent implements OnInit {
  public token: string = '';
  public lista_usuarios: any[] = [];
  public lista_materias: any[] = [];
  public name_user: string = '';
  public rol: string = '';
  
  displayedColumnsM: string[] = [
    'NRC',
    'nombre',
    'seccion',
    'programaEducativo',
    'dias',
    'horaInicio',
    'horaFinal',
    'salon',
    'editar',
    'eliminar',
  ];

  dataSourceM = new MatTableDataSource<DatosMateria>(
    this.lista_materias as DatosMateria[]
  );
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceM.paginator = this.paginator;
  }
  constructor(
    private facadeService: FacadeService,
    private MateriasService: MateriasService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log('Token: ', this.token);
    if (this.token == '') {
      this.router.navigate(['']);
    }
    this.obtenerMaterias();
  }

  //Para paginacion
  //Paginador para Agentes
  public initPaginator() {
    setTimeout(() => {
      this.dataSourceM.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (
        page: number,
        pageSize: number,
        length: number
      ) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex =
          startIndex < length
            ? Math.min(startIndex + pageSize, length)
            : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    }, 500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  //Obtener lista de materias
  public obtenerMaterias() {
    this.MateriasService.obtenerListaMaterias().subscribe(
      (response) => {
        this.lista_materias = response;
        console.log('Lista materias: ', this.lista_materias);
        if (this.lista_materias.length > 0) {
          // Aquí puedes agregar cualquier lógica adicional que necesites para procesar la lista de materias.
          // Por ejemplo, si necesitas agregar o modificar datos antes de mostrarlos en la tabla.

          this.dataSourceM = new MatTableDataSource<DatosMateria>(
            this.lista_materias as DatosMateria[]
          );
        }
      },
      (error) => {
        alert('No se pudo obtener la lista de materias');
      }
    );
  }

  //Cerrar sesión
  public logout() {
    this.facadeService.logout().subscribe(
      (response) => {
        console.log('Entró');

        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public editarMateria(idMateria: number) {
    this.router.navigate(['registro-materias/' + idMateria]);
  }
  public regresar() {
    this.router.navigate(['/home']);
  }
  // Función para eliminar una materia
  public eliminarMateria(idMateria: number) {
    console.log('Materia:', idMateria);
    const dialogRef = this.dialog.open(EliminarMateriaModalComponent, {
      data: { id: idMateria }, // Se pasan valores a través del componente
      height: '268px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDelete) {
        console.log('Materia eliminada');
        // Recargar página
        window.location.reload();
      } else {
        alert('Materia no eliminada');
        console.log('No se eliminó la materia');
      }
    });
  }

  //Función para agregar materia
} //Aquí cierra la clase principal

export interface DatosMateria {
  id: number;
  NRC: number;
  nombre: string;
  seccion: string;
  dias: string;
  horaInicio: string;
  horaFinal: string;
  programaEducativo: string;
  salon: string;
}
