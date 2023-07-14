import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { DialogClienteComponent } from './dialog/DialogCliente.Component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { Response } from '../models/response';
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/DialogDelete.Component';

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
        });
    }

    EditCliente(client: Cliente, enterAnimationDuration: string, exitAnimationDuration: string) {
        const DialogRef = this.dialog.open(DialogClienteComponent, {
            width: this.width,
            enterAnimationDuration,
            exitAnimationDuration,
            data: client
        })
        DialogRef.afterClosed().subscribe(result => {
            this.getClientes()
        })
    }

    DeleteCliente(client: Cliente, enterAnimationDuration: string, exitAnimationDuration: string) {
        const DialogRef = this.dialog.open(DialogDeleteComponent, {
            width: this.width,
            enterAnimationDuration,
            exitAnimationDuration,
        })
        DialogRef.afterClosed().subscribe(result => {
            if (result == true) 
            {
                this.apiCliente.delete(client.id).subscribe(response => {
                    if (response)
                    {
                        this.snackBar.open('Cliente eliminado con exito', '', {
                            duration: 2000
                        })
                        this.getClientes()
                    }
                })
            }
        })
    }

    openAdd(enterAnimationDuration: string, exitAnimationDuration: string) : void {
        const DialogRef = this.dialog.open(DialogClienteComponent, {
            width: this.width,
            enterAnimationDuration,
            exitAnimationDuration,
        });
        DialogRef.afterClosed().subscribe(result => {
            this.getClientes()
        })
    }
}