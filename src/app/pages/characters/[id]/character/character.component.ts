import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-character',
    standalone: true,
    imports: [],
    templateUrl: './character.component.html',
})
export class CharacterComponent implements OnInit {
    @Input() id!: string

    ngOnInit(): void {
        console.log(this.id)
    }
}
