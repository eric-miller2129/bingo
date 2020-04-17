import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GameService } from '../_core/services/game.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
    @ViewChild('success', { static: true }) private successSwal: SwalComponent;

    form: FormGroup;
    gameUrl: string;
    controlUrl: string;

    constructor(
        private fb: FormBuilder,
        private gService: GameService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['', [Validators.required]],
            name: ['', [Validators.required]],
            gameType: ['standard', Validators.required],
            prizes: [''],
            slug: ['']
        });
    }

    copied($event) {
        // this.copySwal.fire();
    }

    takeMeToTheGame() {
        this.router.navigate(['/game', this.form.get('slug').value]);
    }

    async submit() {
        const slug = await this.gService.randomString();
        console.log('[Homepage] Slug: ', slug);
        this.form.get('slug').setValue(slug);

        (await this.gService.createGame(this.form.value)).subscribe((data: any) => {
            this.gameUrl = data.gameUrl;
            this.controlUrl = data.controlUrl;
            this.successSwal.fire();
        });
    }
}
