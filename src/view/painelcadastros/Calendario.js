import React from 'react';
import {ScrollView, TouchableOpacity, View, BackHandler, Text, Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import database from '@react-native-firebase/database';

import {CalendarList, LocaleConfig} from 'react-native-calendars';
import TimePicker from "react-native-24h-timepicker";

export default class Calendario extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        dia: '',
        mes: '',
        ano: '',
        diaSemana:0,
        horaDia:0,
        horaInicio: "",
        minutoInicio: "",
        horaTermino: "",
        minutoTermino: "",
      }

      LocaleConfig.locales['pt-br'] = {
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        today: 'Hoje'
      };
      LocaleConfig.defaultLocale = 'pt-br';
    }

    componentDidMount() {
        //this.carregarCalendario()
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Menu');
            return true;
        });
    }
    
    componentWillUnmount() {
        this.backHandler.remove();
    }

    selecionarDiaCalendario = (date) => {
      this.setState({date:date})
      //this.carregarCalendario();
    }

    /*carregarCalendario = () => {
      var ref = database().ref("/leonbarbershop/calendario");
      

    }*/

    _onPressData = (date) => {
      this.setState({
        dia: date.day,
        mes: date.month,
        ano: date.year,
      })
    }

    cancelDialog = () => {
      this.setState({dialogVisible:false})
    }

    escolherHorarioDia = (horaDia) => {
      this.setState({horaDia:horaDia},() => {
        this.TimePicker.open();
      }) 
    }

    selecionarHorario = (hora, minuto) => {
      console.log(this.state.diaSemana + " | " + this.state.horaDia)     
      if(this.state.diaSemana == 1){
        if(this.state.horaDia == 1){
          this.setState({
            horaInicio:hora,
            minutoInicio:minuto
          }, () => {
            this.salvarHorario(1)
          })
          
          //this.salvarHorario(hora, minuto, 1)

        }else if(this.state.horaDia == 2){
          this.setState({
            horaTermino:hora,
            minutoTermino:minuto
          }, () => {
            this.salvarHorario(2)
          })
          
          //this.salvarHorario(hora, minuto, 2)
        }

      }else if(this.state.diaSemana == 2){
        if(this.state.horaDia == 3){
          this.salvarHorario(hora, minuto, 1)

        }else if(this.state.horaDia == 4){
          this.salvarHorario(hora, minuto, 2)
        }

      }else if(this.state.diaSemana == 3){
        if(this.state.horaDia == 5){
          this.salvarHorario(hora, minuto, 1)

        }else if(this.state.horaDia == 6){
          this.salvarHorario(hora, minuto, 2)
        }

      }else if(this.state.diaSemana == 4){
        if(this.state.horaDia == 7){
          this.salvarHorario(hora, minuto, 1)

        }else if(this.state.horaDia == 8){
          this.salvarHorario(hora, minuto, 2)
        }

      }else if(this.state.diaSemana == 5){
        if(this.state.horaDia == 9){
          this.salvarHorario(hora, minuto, 1)

        }else if(this.state.horaDia == 10){
          this.salvarHorario(hora, minuto, 2)
        }

      }else if(this.state.diaSemana == 6){
        if(this.state.horaDia == 11){
          this.salvarHorario(hora, minuto, 1)

        }else if(this.state.horaDia == 12){
          this.salvarHorario(hora, minuto, 2)
        }

      }else if(this.state.diaSemana == 7){
        if(this.state.horaDia == 13){
          this.salvarHorario(hora, minuto, 1)

        }else if(this.state.horaDia == 14){
          this.salvarHorario(hora, minuto, 2)
        }

      }

      this.cancelarEscolhaHorario();
    }

    salvarHorario = (turnoDia) => {
      if(turnoDia == 1){
        var ref = database().ref(`/leonbarbershop/textos/horarioAtendimento/${this.state.diaSemana}/${this.state.horaDia}`);
        ref.set({
          horaInicio:this.state.horaInicio,
          minutoInicio:this.state.minutoInicio,
        }).then(() => {
          Alert.alert("Sucesso", "O horário foi alterado!")
          this.limparCampos();
        })

      }else if(turnoDia == 2){
        var ref = database().ref(`/leonbarbershop/textos/horarioAtendimento/${this.state.diaSemana}/${this.state.horaDia}`);
        ref.set({
          horaTermino:this.state.horaTermino,
          minutoTermino:this.state.minutoTermino,
        }).then(() => {
          Alert.alert("Sucesso", "O horário foi alterado!")
          this.limparCampos();
        })
      } 
    }

    limparCampos(){
      this.setState({
        diaSemana:0,
        diaHora:0
      })
    }

    cancelarEscolhaHorario() {
      this.TimePicker.close();
    }

    carregarHorarios = (dia) => {
      if(dia == 1){
        var ref = database().ref(`/leonbarbershop/textos/horarioAtendimento/${dia}`);

        ref.on("child_added", (snapshot) => {
          this.setState({horaInicio:snapshot.child("horaInicio").val()})
          this.setState({minutoInicio:snapshot.child("minutoInicio").val()})
          this.setState({horaTermino:snapshot.child("horaTermino").val()})
          this.setState({minutoTermino:snapshot.child("minutoTermino").val()})

        })
      }
    }

    verHorario = (diaSemana) => {
      this.setState({diaSemana:0})
      if(diaSemana == 1){
        this.setState({
          diaSemana:1,
          horaInicio: "",
          minutoInicio: "",
          horaTermino: "",
          minutoTermino: "",
        })
        this.carregarHorarios(1)
      
      }else if(diaSemana == 2){
        this.setState({
          diaSemana:2,
          horaInicio: "",
          minutoInicio: "",
          horaTermino: "",
          minutoTermino: "",
        })
        this.carregarHorarios(2)
      
      }else if(diaSemana == 3){
        this.setState({
          diaSemana:3,
          horaInicio: "",
          minutoInicio: "",
          horaTermino: "",
          minutoTermino: "",
        })
        this.carregarHorarios(3)
      
      }else if(diaSemana == 4){
        this.setState({
          diaSemana:4,
          horaInicio: "",
          minutoInicio: "",
          horaTermino: "",
          minutoTermino: "",
        })
        this.carregarHorarios(4)
      
      }else if(diaSemana == 5){
        this.setState({
          diaSemana:5,
          horaInicio: "",
          minutoInicio: "",
          horaTermino: "",
          minutoTermino: "",
        })
        this.carregarHorarios(5)
      
      }else if(diaSemana == 6){
        this.setState({
          diaSemana:6,
          horaInicio: "",
          minutoInicio: "",
          horaTermino: "",
          minutoTermino: "",
        })
        this.carregarHorarios(6)
      
      }else if(diaSemana == 7){
        this.setState({
          diaSemana:7,
          horaInicio: "",
          minutoInicio: "",
          horaTermino: "",
          minutoTermino: "",
        })
        this.carregarHorarios(7)
      }
    }

    telaDomingo(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Domingo</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(1)}><Text>{this.state.horaInicio == "" || this.state.minutoInicio == "" || this.state.horaInicio == null || this.state.minutoInicio == null ? "Selecionar hora inicial" : this.state.horaInicio+":"+this.state.minutoInicio}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(2)}><Text>{this.state.horaTermino == "" || this.state.minutoTermino == "" || this.state.horaTermino == null || this.state.minutoTermino == null ? "Selecionar hora término" : this.state.horaTermino+":"+this.state.minutoTermino}</Text></TouchableOpacity>
        </View>
      );
    }

    telaSegunda(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Segunda</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(3)}><Text>Início</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(4)}><Text>Término</Text></TouchableOpacity>
        </View>
      );
    }

    telaTerça(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Terça</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(5)}><Text>Início</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(6)}><Text>Término</Text></TouchableOpacity>
        </View>
      );
    }

    telaQuarta(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Quarta</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(7)}><Text>Início</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(8)}><Text>Término</Text></TouchableOpacity>
        </View>
      );
    }

    telaQuinta(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Quinta</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(9)}><Text>Início</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(10)}><Text>Término</Text></TouchableOpacity>
        </View>
      );
    }

    telaSexta(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Sexta</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(11)}><Text>Início</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(12)}><Text>Término</Text></TouchableOpacity>
        </View>
      );
    }

    telaSabado(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Sábado</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(13)}><Text>Início</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(14)}><Text>Término</Text></TouchableOpacity>
        </View>
      );
    }

    render() {
        return (
            <View style={estilos.viewTabs}>
              <View style={estilos.viewSuperiorStatus}>
                <Text style={estilos.textLoginInicial}>Calendário</Text>
              </View>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <CalendarList
                  horizontal={true}
                  pagingEnabled={true}

                  markedDates={{
                    '2019-11-03': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'},
                    '2019-11-10': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'},
                    '2019-11-17': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'},
                    '2019-11-24': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'}
                  }}
                  markingType={'period'}

                  onDayPress={(date) => {
                    this._onPressData(date)
                  }}
                />
                <Text style={estilos.textHorarioAtendimentoCalendario}> Horário de Atendimento</Text>
                <View style={{justifyContent:"center", marginBottom: 20, flexDirection:"row"}}>
                  <Text onPress={() => this.verHorario(1)} style={estilos.diaSemanaCalendario}> Dom </Text>
                  <Text onPress={() => this.verHorario(2)} style={estilos.diaSemanaCalendario}> Seg </Text>
                  <Text onPress={() => this.verHorario(3)} style={estilos.diaSemanaCalendario}> Ter </Text>
                  <Text onPress={() => this.verHorario(4)} style={estilos.diaSemanaCalendario}> Qua </Text>
                  <Text onPress={() => this.verHorario(5)} style={estilos.diaSemanaCalendario}> Qui </Text>
                  <Text onPress={() => this.verHorario(6)} style={estilos.diaSemanaCalendario}> Sex </Text>
                  <Text onPress={() => this.verHorario(7)} style={estilos.diaSemanaCalendario}> Sab </Text> 
                </View>

                <View>
                  {this.state.diaSemana == 1 ? this.telaDomingo() : null}
                  {this.state.diaSemana == 2 ? this.telaSegunda() : null}
                  {this.state.diaSemana == 3 ? this.telaTerça() : null}
                  {this.state.diaSemana == 4 ? this.telaQuarta() : null}
                  {this.state.diaSemana == 5 ? this.telaQuinta() : null}
                  {this.state.diaSemana == 6 ? this.telaSexta() : null}
                  {this.state.diaSemana == 7 ? this.telaSabado() : null}
                </View>

                <TimePicker
                  textCancel="Cancelar"
                  textConfirm="Alterar"
                  selectedHour="00"
                  ref={ref => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.cancelarEscolhaHorario()}
                  onConfirm={(hour, minute) => this.selecionarHorario(hour, minute)}
                >
                </TimePicker>
              </ScrollView>
          
              <ActionButton position="left" buttonColor={colors.corVermelhaApp} onPress={() => this.props.navigation.navigate("Menu")}
                renderIcon={() => (<Ionicons color={colors.corBranca} name="md-arrow-back" size={25}/> )}/>
            </View>
        );
    }

}