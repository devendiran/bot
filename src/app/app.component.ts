import { Component } from '@angular/core';
import { SpeechRecognitionService } from './chat/speech-recognition.service';

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
    this.speechData = "";
  }

  ngOnInit() {
    console.log("hello");
    this.activateSpeechSearchMovie();
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;

    this.speechRecognitionService.record()
      .subscribe(
      //listener
      (value) => {
        this.speechData = value;
        console.log(value);
      },
      //errror
      (err) => {
        console.log(err);
        if (err.error == "no-speech") {
          console.log("--restatring service--");
          this.activateSpeechSearchMovie();
        }
      },
      //completion
      () => {
        this.showSearchButton = true;
        console.log("--complete--");
        this.activateSpeechSearchMovie();
      });
  }
}
