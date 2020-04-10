import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ControlComponent } from './control/control.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,
    },
    {
        path: 'control/:slug',
        component: ControlComponent,
    },
    {
        path: 'game/:slug',
        component: GameComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
