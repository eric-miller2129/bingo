import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GameService } from '../_core/services/game.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
    @ViewChild('copySwal', { static: true }) private copySwal: SwalComponent;

    form: FormGroup;
    url: string;

    constructor(
        private fb: FormBuilder,
        private gService: GameService,
    ) { }

    ngOnInit(): void {
        this.url = environment.url;
        this.form = this.fb.group({
            email: ['', [Validators.required]],
            name: ['', [Validators.required]],
            gameType: ['standard', Validators.required],
            prizes: ['', [Validators.required]],
            slug: ['']
        });
    }

    copied($event) {
        this.copySwal.fire();
    }

    submit() {
        this.form.get('slug').setValue(this.gService.randomString());

        this.gService.createGame(this.form.value);
    }

    makeItVibrate() {
        window.navigator.vibrate([100,100,100,100]);
    }
}
