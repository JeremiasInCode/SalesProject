import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Response } from '../models/response';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit{
    public lst: any;
    public columnas: string[] = ['id', 'nombre', 'acciones'];
    readonly width: string = '300px';

    constructor(
        private apiCliente: ApiclienteService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
    ) {
           
    }

    ngOnInit(): void {
        this.getClientes();
    }

    getClientes() {
        this.apiCliente.getClientes().subscribe(element => {
            this.lst = element.data
        })
    }

    openAdd() {
        const dialogRef = this.dialog.open(DialogClienteComponent, {
            width: this.width
        });
        dialogRef.afterClosed().subscribe(resut => {
            this.getClientes();
        })
    }

    openEdit(cliente: Cliente) {
        const dialogRef = this.dialog.open(DialogClienteComponent, {
            width: this.width,
            data: cliente
        });
        dialogRef.afterClosed().subscribe(resut => {
            this.getClientes();
        })
    }

    Delete(cliente: Cliente) {
        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: this.width
        });
        dialogRef.afterClosed().subscribe(resut => {
            // ! state of result
            if (resut) {
                this.apiCliente.delete(cliente.id).subscribe(response => {
                    if (response.success == 1)
                    {
                        this.snackBar.open('Cliente eliminado con exito', '', {
                            duration: 2000
                        });
                        this.getClientes();
                    }
                });
            }
        })
    }
}
