import { Component } from '@angular/core';
import { SpeechRecognitionService } from './chat/speech-recognition.service';
import { throttle } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  showSearchButton: Boolean;
  speechData: String;
  constructor(private speechRecognitionService: SpeechRecognitionService) {
    this.showSearchButton = true;
    this.speechData = '';
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.activateSpeechSearchMovie();
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;

    this.speechRecognitionService.record()
      .throttle(ev => Observable.interval(5000))
      .subscribe(
        (value) => {
          this.speechData = value;
        },
        (err) => {
          console.log(err);
          if (err.error === 'no-speech') {
            this.activateSpeechSearchMovie();
          }
        },
        () => {
          this.showSearchButton = true;
          this.activateSpeechSearchMovie();
        });
  }
}
