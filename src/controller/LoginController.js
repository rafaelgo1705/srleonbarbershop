import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import ConfigFirebase from '../database/ConfigFirebase';

import TabInicial from '../../App';

export default class LoginController {
    entrar (email, senha, proper) {
        if(this.validarCampos(email, senha)){
            this.firebaseConf = new ConfigFirebase();
            this.firebaseConf.configFirebase();

            try {
                auth().signInWithEmailAndPassword(email, senha).then((user) => {
                    this.abrirTelaInicial(proper);
            
                }).catch(function(error) {
                    var errorCode = error.code;
                    Alert.alert(errorCode);
            
                    if(errorCode == 'auth/user-not-found'){
                        Alert.alert("Erro", "Email não encontrado\n");
                        return false;
            
                    }else if(errorCode == 'auth/wrong-password'){
                        Alert.alert("Erro", "Senha incorreta\n");
                        return false;
                    
                    }else if(errorCode == 'auth/invalid-email'){
                        Alert.alert("Erro", "E-mail inválido\n");
                        return false;
                    
                    }else if(errorCode == 'auth/unknown'){
                        Alert.alert("Erro", "Tente novamente\n");
                        return false;
                    
                    }else{
                        Alert.alert("Login", errorCode)
                        console.error(errorCode);
                        return false;
                    }
                });
            
            } catch (e) {
                Alert.alert("Erro", "Não foi possível conectar")
                console.error(e.message);
                return false;
            }
        }
    }

    //função para validação de campos
    validarCampos (email, senha) {
        var erro = "";
        if(email == "" || email == null || email.length == 0){
            erro += "O campo e-mail está vazio!\n";
        }
        if(senha == "" || senha == null || senha.length == 0){
            erro += "O campo senha está vazio!\n";
        }
    
        if(erro.length == 0){
            return true;
            
        }else{
            Alert.alert("Erro", erro);
        return false;
        }
    }

    //Ir para tela inicial
    abrirTelaInicial(proper){
        proper.navigation.navigate('TabInicial');
    }
}