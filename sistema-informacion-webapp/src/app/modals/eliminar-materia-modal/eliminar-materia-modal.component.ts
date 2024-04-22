import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service'; // Asegúrate de tener un servicio llamado 'MateriasService' o ajusta el nombre según el servicio que tengas para manejar materias.

@Component({
  selector: 'app-eliminar-materia-modal',
  templateUrl: './eliminar-materia-modal.component.html',
  styleUrls: ['./eliminar-materia-modal.component.scss'],
})
export class EliminarMateriaModalComponent implements OnInit {
  constructor(
    public materiasService: MateriasService, // Cambiado a 'materiasService'
    private dialogRef: MatDialogRef<EliminarMateriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('Id materia: ', this.data.id);
  }

  public cerrar_modal() {
    this.dialogRef.close({ isDelete: false });
  }

  public eliminarMateria() {
    // Cambiado a 'eliminarMateria'
    this.materiasService.eliminarMateria(this.data.id).subscribe(
      // Asegúrate de tener un método llamado 'eliminarMateria' en tu servicio o ajusta el nombre según el método que tengas para eliminar materias.
      (response) => {
        console.log(response);
        this.dialogRef.close({ isDelete: true });
      },
      (error) => {
        this.dialogRef.close({ isDelete: false });
      }
    );
  }
}
