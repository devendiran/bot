import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor(private zone: NgZone) { }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    return this.client.textRequest(msg)
      .then(res => {
        this.zone.run(() => {
          const fulfillment = res.result.fulfillment;
          const speech = res.result.fulfillment.speech;
          const msg = new (<any>window).SpeechSynthesisUtterance(speech);
          (<any>window).speechSynthesis.speak(msg);
          let botMessage = new Message(speech, 'bot');
          if (fulfillment.data) {
            botMessage = new Message(fulfillment.data.content +'\n'+ speech, 'bot');
          }
          this.update(botMessage);
        });
      });
  }



  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }


}
