import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import { BotOptions } from './bot-option';
import 'rxjs/add/operator/scan';
import { OptionComponent } from './options.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit, AfterViewInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService) { }
  options: BotOptions[];

  @ViewChildren('chatOption') chatOptions: QueryList<OptionComponent>;

  ngAfterViewInit() {
    this.chatOptions.forEach((chatOption) => {
      chatOption.click.subscribe((option: BotOptions) => {
        this.chat.converse(option.content);
      });
    });
  }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .scan((acc, val) => acc.concat(val) );

    this.options = [{
      name: 'Panel Board',
      content: 'Tell me about a panel board'
    }, {
      name: 'Switch Board',
      content: 'Tell me about a Switch board'
    }, {
      name: 'WL Breaker',
      content: 'Tell me about a WL Breaker'
    }, {
      name: 'Transformers',
      content: 'Tell me about a Transformers'
    }];
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
