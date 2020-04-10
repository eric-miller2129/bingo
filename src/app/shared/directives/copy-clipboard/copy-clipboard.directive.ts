import {
    Directive,
    Input,
    Output,
    HostListener,
    EventEmitter
} from '@angular/core';

@Directive({
    selector: '[appCopyClipboard]'
})
export class CopyClipboardDirective {
    // tslint:disable-next-line:no-input-rename
    @Input('appCopyClipboard')
    public payload: string;

    @Output() copied: EventEmitter<string> = new EventEmitter<string>();

    @HostListener('click', ['$event'])
    onClick(e: MouseEvent): void {
        e.preventDefault();

        // tslint:disable-next-line:curly
        if (!this.payload) return;

        console.group('Copy Clipboard Directive');
        console.log(`Value Copied: ${this.payload}`);
        console.groupEnd();

        const listener = (event: ClipboardEvent) => {
            // tslint:disable-next-line:no-string-literal
            const clipboard = event.clipboardData || window['clipboardData'];

            clipboard.setData('text', this.payload.toString());
            e.preventDefault();

            this.copied.emit(this.payload);
        };

        document.addEventListener('copy', listener, false);
        document.execCommand('copy');
        document.removeEventListener('copy', listener, false);
    }

}
