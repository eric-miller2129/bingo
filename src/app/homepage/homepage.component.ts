import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
    form: FormGroup;
    url: string;

    constructor(
        private fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.url = environment.url;
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            gameType: ['', Validators.required],
            prizes: ['', [Validators.required]]
        });
    }

}
