import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { ControlComponent } from './control/control.component';
import { GameComponent } from './game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        ControlComponent,
        GameComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        SweetAlert2Module.forRoot({
            provideSwal: () => import('sweetalert2/src/sweetalert2.js'),
        }),
        SharedModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        SocketIoModule.forRoot(config),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
