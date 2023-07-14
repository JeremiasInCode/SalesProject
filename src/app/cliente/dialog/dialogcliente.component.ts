import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/models/cliente";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component ({
      templateUrl: 'dialogcliente.component.html'
})


export class DialogClienteComponent {
    public nombre!: string
    public id !: number
    constructor(
        public dialogRef: MatDialogRef<DialogClienteComponent>,
        public apiCliente: ApiclienteService,
        public snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public client: Cliente
    ) {
        if (this.client !== null) {
            this.nombre = client.nombre
            this.id = client.id
        }
    }

    close() {
        this.dialogRef.close();
    }

    
    addCliente() {
        const cliente: Cliente = { nombre: this.nombre, id: 0 }
        this.apiCliente.add(cliente).subscribe(response => {
            if (response.success === 1)
            {
                this.dialogRef.close();
                this.snackBar.open('Cliente insertado con éxito', '', {
                    duration: 2000
                });
            }
        })
    }

    editCliente() {
        const cliente: Cliente = { nombre: this.nombre, id: this.id }
        this.apiCliente.edit(cliente).subscribe(response => {
            if (response.success === 1)
            {
                    this.dialogRef.close();
                    this.snackBar.open('Cliente actualizado con éxito', '', {
                        duration: 2000
                    })
            }
        })
    }
}


