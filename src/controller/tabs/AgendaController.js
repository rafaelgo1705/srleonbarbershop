import {Alert} from 'react-native';

import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class ContaController {
    salvarAgendamento(proper, nome){
        const uid = auth().currentUser.uid;

        const ref = database().ref(`/agendamentos/${uid}`);

        try{ 
            ref.set({
            uid,
            name: nome,
          });

        }catch(error){
            Alert.alert("Erro", "Não foi possível realizar o agendamento!")
            
        }
    }
}