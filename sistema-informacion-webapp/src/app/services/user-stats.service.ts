import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacadeService } from './facade.service'; // Asegúrate de que la ruta sea correcta
import { environment } from '../../environments/environment'; // Ajusta esta ruta a donde se encuentra tu archivo de environment

@Injectable({
  providedIn: 'root',
})

//esto es para obtener los datos de los usuarios
export class UserStatsService {
  constructor(private http: HttpClient, private facadeService: FacadeService) {}

  // Obtiene los datos de los usuarios y los retorna en un observable
  getUserCounts(): Observable<any> {
    const token = this.facadeService.getSessionToken(); 
    // Obtiene el token de la sesión actual para enviarlo en la petición
    const headers = new HttpHeaders({
      // Establece las cabeceras de la petición
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, 
    });

    // Realiza la petición GET al endpoint correspondiente
    return this.http.get<any>(`${environment.url_api}/admins-edit/`, {
      // Ajusta la ruta del endpoint a la que corresponda
      headers: headers,
    });
  }
}
