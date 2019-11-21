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
        diaHora:0,
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
        this.carregarCalendario()
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
      this.carregarCalendario();
    }

    carregarCalendario = () => {
      var ref = database().ref("/leonbarbershop/calendario");
      

    }

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
      console.log(this.state.diaSemana + " | " + this.state.diaHora)     
      if(this.state.diaSemana == 1){
        if(this.state.diaHora == 11){
          this.salvarHorario(hora, minuto, this.state.diaSemana)

        }else if(this.state.diaHora == 12){
          this.salvarHorario(hora, minuto, this.state.diaSemana)
        }
    
      }else if(this.state.diaSemana == 2){
        this.salvarHorario(hora, minuto, this.state.diaSemana)

      }else if(this.state.diaSemana == 3){
        this.salvarHorario(hora, minuto, this.state.diaSemana)

      }else if(this.state.diaSemana == 4){
        this.salvarHorario(hora, minuto, this.state.diaSemana)

      }else if(this.state.diaSemana == 5){
        this.salvarHorario(hora, minuto, this.state.diaSemana)

      }else if(this.state.diaSemana == 6){
        this.salvarHorario(hora, minuto, this.state.diaSemana)

      }else if(this.state.diaSemana == 7){
        this.salvarHorario(hora, minuto, this.state.diaSemana)
      }
      this.cancelarEscolhaHorario();
    }

    salvarHorario = (hora, minuto, diaSemana) => {
      if(this.state.diaHora == 11){
        var ref = database().ref(`/leonbarbershop/textos/horarioAtendimento/${diaSemana}/${this.state.diaHora}`);
        ref.set({
          horaInicio:hora,
          minutoInicio:minuto,
         
        })
      }else if(this.state.diaHora == 12){
        var ref = database().ref(`/leonbarbershop/textos/horarioAtendimento/${diaSemana}/${this.state.diaHora}`);
        ref.set({
          horaFim:hora,
          minutoFim:minuto,
         
        })
      }
      
    }

    cancelarEscolhaHorario() {
      this.TimePicker.close();
    }

    verHorario = (diaSemana) => {
      this.setState({diaSemana:0})
      if(diaSemana == 1){
        this.setState({diaSemana:1})
      
      }else if(diaSemana == 2){
        //this.TimePicker.open();
        this.setState({diaSemana:2})
      
      }else if(diaSemana == 3){
        //this.TimePicker.open();
        this.setState({diaSemana:3})
      
      }else if(diaSemana == 4){
        //this.TimePicker.open();
        this.setState({diaSemana:4})
      
      }else if(diaSemana == 5){
        //this.TimePicker.open();
        this.setState({diaSemana:5})
      
      }else if(diaSemana == 6){
        //this.TimePicker.open();
        this.setState({diaSemana:6})
      
      }else if(diaSemana == 7){
        //this.TimePicker.open();
        this.setState({diaSemana:7})
      
      }
    }

    telaDomingo(){
      return(
        <View style={{alignItems:"center"}}>
          <Text style={estilos.opcoesContaTab}>Domingo</Text>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(11)}><Text>Início</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.escolherHorarioDia(12)}><Text>Término</Text></TouchableOpacity>
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
                  {this.state.diaSemana == 2 ? this.telaDomingo() : null}
                  {this.state.diaSemana == 3 ? this.telaDomingo() : null}
                  {this.state.diaSemana == 4 ? this.telaDomingo() : null}
                  {this.state.diaSemana == 5 ? this.telaDomingo() : null}
                  {this.state.diaSemana == 6 ? this.telaDomingo() : null}
                  {this.state.diaSemana == 7 ? this.telaDomingo() : null}
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