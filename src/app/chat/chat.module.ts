import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscapeHtmlPipe } from './keep-html.pipe';

import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';
import { SpeechRecognitionService } from './speech-recognition.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ChatDialogComponent,
    EscapeHtmlPipe
  ],
  exports: [ ChatDialogComponent ],
  providers: [ChatService, SpeechRecognitionService]
})
export class ChatModule { }
