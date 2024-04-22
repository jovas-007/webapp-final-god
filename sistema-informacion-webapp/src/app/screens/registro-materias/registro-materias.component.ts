import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
declare var $: any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss'],
})
export class RegistroMateriasComponent implements OnInit {
  // 2. Inicializamos la propiedad materia

  public mat: any = {};
  public editar: boolean = false;
  public idMateria: Number = 0;

  public errors: any = {};

  constructor(
    private materiasService: MateriasService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.mat = this.materiasService.esquemaMateria();

    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idMateria = this.activatedRoute.snapshot.params['id'];
      console.log('ID Materia: ', this.idMateria);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID();
    }
  }


  ///este metodo obtiene el usuario por su ID
  public obtenerUserByID() {
    this.materiasService.getMateriaByID(this.idMateria).subscribe(
      (response) => {
        ///el response es la respuesta que nos da el servidor
        this.mat = response;
        //Asignamos los valores a nuestro objeto global

        this.mat.nombre = response.nombre;
        this.mat.seccion = response.seccion; 
        this.mat.dias = response.dias; 
        this.mat.horaInicio = response.horaInicio; 
        this.mat.horaFinal = response.horaFinal;
        this.mat.salon = response.salon;
        this.mat.programaEducativo = response.programaEducativo;

        console.log('Datos materia: ', this.mat);
      },
      (error) => {
        alert('No se pudieron obtener los datos de la materia para editar');
      }
    );
  }

  public regresar() {
    this.location.back();
  }

  public todosLosCamposLlenos(): boolean {
    for (let key in this.mat) {
      if (!this.mat[key] || this.mat[key].toString().trim() === '') {
        return false;
      }
    }
    return true;
  }


  ///este metodo registra al usuario
  public registrarM() {
    // Limpiar errores previos
    this.errors = [];

    // Validar la materia
    this.errors = this.materiasService.validarMateria(this.mat, this.editar);

    // Si hay errores, mostrarlos y detener la ejecución
    if (Object.keys(this.errors).length > 0) {
      alert('Por favor, corrija los errores antes de continuar.');
      console.log('Errores de validación:', this.errors);
      return;
    }

    // Verificar si todos los campos están llenos
    if (!this.todosLosCamposLlenos()) {
      alert('Por favor, llene todos los campos antes de continuar.');
      return;
    } else {
      this.materiasService.registrarMateria(this.mat).subscribe(
        (response) => {
          alert('Materia registrada correctamente');
          console.log('Materia registrada: ', response);
          this.router.navigate(['/']);
        },
        (error) => {
          alert('No se pudo registrar Materia');
        }
      );
    }
  }


  ///este metodo actualiza los datos del usuario
  public actualizar() {
    //Validación
    this.errors = [];
///validamos los campos de la materia
    this.errors = this.materiasService.validarMateria(this.mat, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    console.log('Pasó la validación');

    this.materiasService.editarMateria(this.mat).subscribe(
      (response) => {
        alert('Materia editada correctamente');
        console.log('Materia editada: ', response);
        //Si se editó, entonces mandar al home
        this.router.navigate(['home']);
      },
      (error) => {
        alert('No se pudo editar Materia');
      }
    );
  }
}
