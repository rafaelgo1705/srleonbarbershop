import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import ConfigFirebase from '../database/ConfigFirebase';

export default class CadastroController {
    //cadastrar usuário no firebase
    cadastrar (nome, email, telefone, senha, confirmaSenha, proper) {
        if(this.validarCampos (nome, email, telefone, senha, confirmaSenha)){
            if(this.validarSenhas(senha, confirmaSenha)){
                this.firebaseConf = new ConfigFirebase();
                this.firebaseConf.configFirebase();

                try {
                auth().createUserWithEmailAndPassword(email, senha).then((user) => {
                    auth().currentUser.updateProfile({
                        displayName: nome,

                    }).catch(function(error){
                        Alert.alert("Erro", "Não foi possível criar o perfil!");
                    });

                    auth().currentUser.updatePhoneNumber(String.toString(telefone)).then(function(){

                    }).catch(function(error){
                        console.error("Impossível adicionar número de telefone");
                    });
                    Alert.alert("Sucesso", nome + "\n" + telefone + "\n");
            
                }).catch(function(error) {
                    var errorCode = error.code;
            
                    if(errorCode == 'auth/invalid-email'){
                        Alert.alert("Erro", "Email não encontrado\n");
                        return false;
            
                    }else if(error.code == 'auth/weak-password'){
                        Alert.alert("Erro", "A senha precisa ter no mínimo 6 dígitos\n");
                        return false;

                    }else if(error.code == 'auth/email-already-in-use'){
                        Alert.alert("Erro", "Este e-mail já está sendo usado\n");
                        return false;
                    
                    }else{
                        Alert.alert("Erro", errorCode);
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
    }
    
    //função para validação de campos
    validarCampos (nome, email, telefone, senha, confirmaSenha) {
        var erro = "";
        if(nome == "" || nome == null){
            erro += "O campo nome está vazio!\n";
        }
        if(email == "" || email == null){
            erro += "O campo e-mail está vazio!\n";
        }
        if(telefone == "" || telefone == null){
            erro += "O campo telefone está vazio!\n";
          }
        if(senha == "" || senha == null){
            erro += "O campo senha está vazio!\n";
        }
        if(confirmaSenha == "" || confirmaSenha == null){
            erro += "O campo Confirmar Senha está vazio!\n";
        }
      
        if(erro.length == 0){
            return true;
        }else{
          Alert.alert("Erro", erro);
            return false;
        }
    }

    //validar se senhas são iguais
    validarSenhas(senha, confirmaSenha){
        if(senha == confirmaSenha){
            return true;
        
        }else{
            Alert.alert("Senha", "As senhas não correspondem");
            return false;
        }
    }
}