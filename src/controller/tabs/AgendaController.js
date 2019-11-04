import {Alert} from 'react-native';

import database from '@react-native-firebase/database';

export default class AgendaController {
    salvarAgendamento(proper, idCorteAgenda, nomeCorte, precoCorte, idCabeleireiroAgenda, nomeCabeleireiro,
         dia, mes, ano, hora, minuto, nomeCliente, emailCliente, telefoneOutroCliente){           
        const ref = database().ref('leonbarbershop/agendamentos/');

        try{ 
            ref.push().set({
                idCorteAgenda: idCorteAgenda,
                nomeCorte: nomeCorte,
                precoCorte: precoCorte,
                idCabeleireiroAgenda: idCabeleireiroAgenda,
                nomeCabeleireiro: nomeCabeleireiro,
                nomeCliente: nomeCliente,
                telefoneOutroCliente: telefoneOutroCliente,
                emailCliente: emailCliente,
                ano: ano,
                mes: mes,
                dia: dia,
                horaMinuto: hora+minuto,

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