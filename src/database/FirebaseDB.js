import database from '@react-native-firebase/database';
 
export default function firebaseDB() { 
  const ref = database().ref(`/leonbarbershop/`);
  
  return ref;
}