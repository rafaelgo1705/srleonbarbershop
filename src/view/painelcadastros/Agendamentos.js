import React from 'react';
import {View, BackHandler, FlatList, Text, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

import Base64 from '../../base64/Base64';

import moment from 'moment';
import DatePicker from 'react-native-datepicker';

export default class Agendamentos extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        arrayAgendamentos: [],
        date: moment(new Date()),
        mensagemVazia: 0,
      }
    }

    componentDidMount() {
        this.carregarAgendamentos()
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Cadastramento');
            return true;
        });
    }
    
    componentWillUnmount() {
        this.backHandler.remove();
    }

    selecionarDiaCalendario = (date) => {
      this.setState({date:date})
      this.carregarAgendamentos();
    }

    carregarAgendamentos = () => {
        var ref = database().ref("/leonbarbershop/agendamentos");
        this.setState({
          arrayAgendamentos:[],
          mensagemVazia: 0
        })

        var data = new Date(this.state.date)

        var diaAtual = data.getDate();
        var mesAtual = data.getMonth()+1;
        var anoAtual = data.getFullYear();

        console.log("Dia: "+ diaAtual + " | Mês: "+ mesAtual+ " | Ano: " + anoAtual)
        console.log("Data: "+ data)

        var horaAtual = moment(new Date().getHours())
        var minutosAtuais = moment(new Date().getMinutes())
    
        ref.orderByChild("hora").on("child_added", (snapshot) => {
          var dia = 0, mes = 0, ano = 0, hora = 0, minutos = 0;

          dia = snapshot.child("dia").val();
          mes = snapshot.child("mes").val();
          ano = snapshot.child("ano").val();
          hora = snapshot.child("hora").val();
          minutos = snapshot.child("minuto").val();

          if(ano == anoAtual){
            if(mes == mesAtual){
              if(dia == diaAtual){
                this.arrayVazio(1)
                this.setState({ 
                  arrayAgendamentos : 
                  [...this.state.arrayAgendamentos, ...[
                      {
                      id:snapshot.key,
                      nomeCliente:snapshot.child("nomeCliente").val(),
                      preco:snapshot.child("precoCorte").val(),
                      hora: hora,
                      minuto: minutos,
                      dia: dia,
                      mes: mes,
                      ano: ano,
                      nomeCorte: snapshot.child("nomeCorte").val(),
                      }
                  ]] 
                })
              }
            }
          }
          
        })
    }

    arrayVazio = (valor) => {
      if(valor == 0){
        this.setState({mensagemVazia:0})
      }else{
        this.setState({mensagemVazia:1})
      }
    }

    mensagem = () => {
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>{"Não há agendamentos para este dia!"}</Text>
        </View>
      );
    }

    render() {
        return (
            <View style={estilos.viewTabs}>
              <View style={estilos.viewSuperiorStatus}>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Selecionar"
                  cancelBtnText="Cancelar"
                  customStyles={{ 
                    dateInput: {
                      marginLeft: 36,
                      
                    },
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                      
                    },
                    dateText: {
                      color: "#FFFFFF"
                    }
                  }}
                  onDateChange={(dateNot, dateYes) => {this.selecionarDiaCalendario(dateYes)}}/>
              </View>

              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View>
                  {this.state.mensagemVazia == 0 ? this.mensagem() : null}
                </View>
              <FlatList
                data={this.state.arrayAgendamentos}
                renderItem={({ item }) => {
                  return (
                    <View style={[estilos.itemArray, { backgroundColor: colors.corBranca }]}>
                      <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                      <View style={{flexDirection:'column'}}>
                        <Text style={estilos.title}>{item.nomeCliente}</Text>
                        <Text style={estilos.textoNormalProduto}>{item.dia+ "/"+item.mes+"/"+item.ano + " | "+item.hora+ ":" +item.minuto}</Text>
                        <Text style={estilos.textoNormalProduto}>{item.nomeCorte + " | R$ "+ item.preco + ",00"}</Text>
                      </View>
                    </View>
                  ) 
                }}
                keyExtractor={item => item.id}
              />
              </ScrollView>
              <ActionButton position="left" buttonColor={colors.corVermelhaApp} onPress={() => this.props.navigation.navigate("Cadastramento")}
                renderIcon={() => (<Ionicons color={colors.corBranca} name="md-arrow-back" size={25}/> )}/>
            </View>
        );
    }

}