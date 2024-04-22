import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) {}

  public esquemaMateria() {
    return {
      NRC: '',
      nombre: '',
      seccion: '',
      dias: '',
      horaInicio: '',
      horaFinal: '',
      salon: '',
      programaEducativo: '',
    };
  }

  // Validación para el formulario
  public validarMateria(data: any, editar: boolean) {
    console.log('Validando materia... ', data);
    let error: any = {};

    // Aquí puedes agregar las validaciones específicas para cada campo de la materia
    // Validación para NRC
    if (!this.validatorService.required(data['NRC'])) {
      error['NRC'] = this.errorService.required;
    } else if (!this.validatorService.numeric(data['NRC'])) {
      error['NRC'] = 'El NRC debe ser numérico.';
    }
    // Validación para nombre de la materia
    if (!this.validatorService.required(data['nombre'])) {
      error['nombre'] = this.errorService.required;
    }

    // Validación para sección
    if (!this.validatorService.required(data['seccion'])) {
      error['seccion'] = this.errorService.required;
    } else if (!this.validatorService.numeric(data['seccion'])) {
      error['seccion'] = 'La sección debe ser numérica.';
    }

    // Validación para días
    if (!this.validatorService.required(data['dias'])) {
      error['dias'] = this.errorService.required;
    }

    // Validación para hora de inicio
    if (!this.validatorService.required(data['horaInicio'])) {
      error['horaInicio'] = this.errorService.required;
    }

    // Validación para hora final
    if (!this.validatorService.required(data['horaFinal'])) {
      error['horaFinal'] = this.errorService.required;
    }

    // Validación para salón
    if (!this.validatorService.required(data['salon'])) {
      error['salon'] = this.errorService.required;
    }

    // Validación para programa educativo
    if (!this.validatorService.required(data['programaEducativo'])) {
      error['programaEducativo'] = this.errorService.required;
    }
    // Return arreglo
    return error;
  }

  // Aquí van los servicios HTTP
  // Servicio para registrar una nueva materia
  public registrarMateria(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.url_api}/materias/`,
      data,
      httpOptions
    );
  }

  // Obtener lista de materias
  //Registrar
  public obtenerListaMaterias(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, {
      headers: headers,
    });
  }

  // Obtener una materia por su NRC
  public getMateriaByID(idMateria: Number) {
    return this.http.get<any>(
      `${environment.url_api}/materias/?id=${idMateria}`,
      httpOptions
    );
  }

  // Servicio para actualizar una materia
  public editarMateria(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.put<any>(`${environment.url_api}/materias-edit/`, data, {
      headers: headers,
    });
  }

  // Eliminar materia
  public eliminarMateria(idMateria: string): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.delete<any>(
      `${environment.url_api}/materias-edit/?id=${idMateria}`,
      { headers: headers }
    );
  }
}
