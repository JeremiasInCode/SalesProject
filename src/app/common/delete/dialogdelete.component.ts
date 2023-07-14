import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

@Component({
      templateUrl: 'DialogDelete.Component.html'
})

export class DialogDeleteComponent {
      constructor (
            public DialogRef: MatDialogRef<DialogDeleteComponent>
      ) 
      {

      }
}