import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

export default class ContaController {
    redefinirSenha(proper){
        proper.navigation.navigate('RedefinirSenha');
    }

    editarConta(proper){
        proper.navigation.navigate('EditarConta');
    }

    painelAdministrador(proper){
        proper.navigation.navigate('TabPainel');
    }

    sairApp(){
        Alert.alert("Sair", "Deseja mesmo sair?",
        [
            {
                text: 'Não', onPress: () => 
                console.log('Não pressed')
            },
            {
                text: 'Sim', onPress: () => 
                auth().signOut().catch(error = () => {
                Alert.alert("Erro", error);
                })
            }
        ]);
    }
}