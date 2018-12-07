import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBIh9gIAWRcOjYMlNUPvslXlXRirQdz0go",
      authDomain: "angular-blog-7d6f0.firebaseapp.com",
      databaseURL: "https://angular-blog-7d6f0.firebaseio.com",
      projectId: "angular-blog-7d6f0",
      storageBucket: "",
      messagingSenderId: "928104087627"
    };
    firebase.initializeApp(config);
  }
}
