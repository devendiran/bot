import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeHtmlPipe } from './keep-html.pipe';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';
import { SpeechRecognitionService } from './speech-recognition.service';
import { FormsModule } from '@angular/forms';
import { OptionComponent } from './chat-dialog/options.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ChatDialogComponent,
    EscapeHtmlPipe,
    OptionComponent
  ],
  exports: [ ChatDialogComponent ],
  providers: [ChatService, SpeechRecognitionService]
})
export class ChatModule { }
