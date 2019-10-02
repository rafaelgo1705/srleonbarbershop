import {Alert} from 'react-native';

import auth from '@react-native-firebase/auth';

export default class RedefinirSenhaController {
    alterar(senhaAtual, senhaNova, senhaNovaConfirma){
        if(this.validarCampos(senhaAtual, senhaNova, senhaNovaConfirma)){
            if(this.validarSenhas(senhaNova, senhaNovaConfirma)){
                try{
                    this.reautenticarUsuario(senhaAtual).then(() => {
                        var user = auth().currentUser;
                        user.updatePassword(senhaNova).then(() => {
                            Alert.alert("Sucesso", "Senha alterada com sucesso!")
                        }).catch((error) => { 
                            console.log(error); 
                        });
        
                    }).catch((error) => { 
                        console.log(error); 
                    });

                } catch(error){
                    Alert.alert("Erro", "Impossível alterar a senha")
                }
            }
        }
    }

    reautenticarUsuario(senhaAtual){
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(user.email, senhaAtual);
        return user.reauthenticateWithCredential(cred);

    }

    validarCampos (senhaAtual, senhaNova, senhaNovaConfirma) {
        var erro = "";
        if(senhaAtual == "" || senhaAtual == null){
            erro += "O Senha atual está vazio!\n";
        }
        if(senhaNova == "" || senhaNova == null){
            erro += "O campo Nova senha está vazio!\n";
        }
        if(senhaNovaConfirma == "" || senhaNovaConfirma == null){
            erro += "O campo Confirmar nova senha está vazio!\n";
        }
      
        if(erro.length == 0){
            return true;
        }else{
          Alert.alert("Erro", erro);
            return false;
        }
    }

    //validar se senhas são iguais
    validarSenhas(senhaNova, senhaNovaConfirma){
        if(senhaNova == senhaNovaConfirma){
            return true;
        
        }else{
            Alert.alert("Senha", "As senhas novas não correspondem");
            return false;
        }
    }
}