import {Directive, OnInit, Input, HostBinding} from '@angular/core';
import {Bar} from './bar.component';

@Directive({ selector: 'bs-progress, [progress]' })
export class Progress implements OnInit {
    @Input() public animate:boolean;
    @HostBinding('class') private addClass = 'progress';

    ngOnInit() {
        this.animate = this.animate !== false;

    }
}
