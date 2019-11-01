import {Alert} from 'react-native';

import database from '@react-native-firebase/database';

export default class AgendaController {
    salvarAgendamento(proper, idCorteAgenda, nomeCorte, precoCorte, idCabeleireiroAgenda, nomeCabeleireiro,
         dia, mes, ano, hora, minuto, nomeCliente, emailCliente){           
        const ref = database().ref(`leonbarbershop/agendamentos/${emailCliente}/${ano}/${mes}/${dia}/${hora+minuto}`);

        try{ 
            ref.set({
                idCorteAgenda: idCorteAgenda,
                nomeCorte: nomeCorte,
                precoCorte: precoCorte,
                idCabeleireiroAgenda: idCabeleireiroAgenda,
                nomeCabeleireiro: nomeCabeleireiro,
                nomeCliente: nomeCliente,

            }).then(() => {
                Alert.alert("Sucesso", "O agendamento foi realizado com sucesso!",
                [{
                    text: "Ok", onPress: () => {
                        proper.limparCampos()
                    }
                }]) 
            })

        }catch(error){
            Alert.alert("Erro", "Não foi possível realizar o agendamento!")
            
        }
    }
}