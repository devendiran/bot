import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { BotOptions } from './bot-option';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'chat-option',
    template: `<ng-container>
                    <button class= "button button-outline" (click)="onClick()"> {{ option.name }}</button>
              </ng-container>`
})

export class OptionComponent implements OnInit {
    @Input()
    option: BotOptions;

    @Output()
    click: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    onClick(option: BotOptions) {
        this.click.emit(this.option);
    }
}
