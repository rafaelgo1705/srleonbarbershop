import { firebase } from '@react-native-firebase/auth';
import * as firebaseDatabase from '@react-native-firebase/app'

export default class ConfigFirebase {
  configFirebase() {
    var firebaseConfig = null;
    firebaseConfig = {
      apiKey: "AIzaSyBTRQrv5dLFqkaJRxdJUN8MkUgg4BKjOCo",
      authDomain: "leonbarbershop-b1965.firebaseapp.com",
      databaseURL: "https://leonbarbershop-b1965.firebaseio.com",
      projectId: "leonbarbershop-b1965",
      storageBucket: "",
      messagingSenderId: "1012588057510",
      appId: "1:1012588057510:web:136ae66cea01a188cd3567"
    };
    
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
  }
}