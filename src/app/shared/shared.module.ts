import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyClipboardDirective } from './directives/copy-clipboard/copy-clipboard.directive';
import { NumberGeneratorComponent } from './components/number-generator/number-generator.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
    declarations: [
        CopyClipboardDirective,
        NumberGeneratorComponent,
        CardComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CopyClipboardDirective,
        NumberGeneratorComponent,
        CardComponent,
    ]
})
export class SharedModule { }
