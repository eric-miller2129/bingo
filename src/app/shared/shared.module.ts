import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyClipboardDirective } from './directives/copy-clipboard/copy-clipboard.directive';
import { NumberGeneratorComponent } from './components/number-generator/number-generator.component';


@NgModule({
    declarations: [
        CopyClipboardDirective,
        NumberGeneratorComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CopyClipboardDirective,
        NumberGeneratorComponent,
    ]
})
export class SharedModule { }
