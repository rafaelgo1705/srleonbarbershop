import React, {Component} from 'react';
import {View, Image, Text, Alert, StatusBar, ScrollView} from 'react-native';
import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import moment from 'moment';

export default class Home extends React.Component {
  state = { currentUser: null }

  constructor(props) {
    super(props);

    this.state = {text:"", statusBarbearia: ""};
    this.state = {time: ''};

    this.state = ({
      textos: [],
    });

    this.verificarHora()

  }

  preencherTextos() {
    const ref = database().ref("/leonbarbershop/textos");

    ref.on("value", (snapshot) => {
      let textos = [];
      textos = [
        snapshot.child("textoTitulo").val(),
        snapshot.child("textoNormal").val(), 
        snapshot.child("statusAtendimento").val(),
        snapshot.child("horarioAtendimento/SegSexInicio").val(),
        snapshot.child("horarioAtendimento/SegSexFim").val(),
        snapshot.child("horarioAtendimento/SabInicio").val(),
        snapshot.child("horarioAtendimento/SabFim").val(),
        snapshot.child("horarioAtendimento/DomInicio").val(),
        snapshot.child("horarioAtendimento/DomFim").val(),
      ]

      this.setState({textos:textos})
        
    });
  }

  diaDaSemana(date) {
    var semana = new Array(7);
    semana[0] = "Sunday";
    semana[1] = "Monday";
    semana[2] = "Tuesday";
    semana[3] = "Wednesday";
    semana[4] = "Thursday";
    semana[5] = "Friday";
    semana[6] = "Saturday";
    
    return semana[date.getDay()];
  }

  verificarHora(){
    var dayOfWeek = moment().toDate();
    var diaDaSemana = this.diaDaSemana(dayOfWeek);

    var hora = moment().format('HH');
    
    //if(diaDaSemana == this.state.textos[10]){
      if(hora >= this.state.textos[3] && hora < this.state.textos[4]){
        const ref = database().ref("/leonbarbershop/textos");
        const refHorarios = database().ref("/leonbarbershop/textos/horarioAtendimento");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: true,
        })
        refHorarios.set({
          SegSexInicio: this.state.textos[3],
          SegSexFim: this.state.textos[4],
          SabInicio: this.state.textos[5],
          SabFim: this.state.textos[6],
          DomInicio: this.state.textos[7],
          DomFim: this.state.textos[8],
        })

      }else {
        Alert.alert("Aqui", this.state.textos[3])
        /*const ref = database().ref("/leonbarbershop/textos");
        const refHorarios = database().ref("/leonbarbershop/textos/horarioAtendimento");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: false,
        })
        refHorarios.set({
          SegSexInicio: this.state.textos[3],
          SegSexFim: this.state.textos[4],
          SabInicio: this.state.textos[5],
          SabFim: this.state.textos[6],
          DomInicio: this.state.textos[7],
          DomFim: this.state.textos[8],
        })*/

        
      }

    //}else if(diaDaSemana == this.state.textos[5]){


    //}else if(diaDaSemana == this.state.textos[7]){
      
    
    //}    
  }

  horarioAtendimento(){
    var horarioAtendimento = "Seg à Sex " + this.state.textos[3] + ":00 - " + this.state.textos[4] +":00 e Sáb " + this.state.textos[5] + ":00 - " + this.state.textos[6] + ":00";

    return horarioAtendimento;
  }

  statusCarregar(){
    if(this.state.textos[2] == true){
      return (
        <Text style={estilos.textoStatusBarbeariaAberto}>Aberto agora</Text>
        
      );
    } else if(this.state.textos[2] == false) {
      return (
        <Text style={estilos.textoStatusBarbeariaFechado}>Fechado</Text>
      
      );
    }else{
      return null;
    }
  }

  componentDidMount() {
    const { currentUser } = auth().currentUser;
    this.setState({ currentUser })

    this.preencherTextos();

    while(this.state.textos.length != 0){
      
    }
  }

  componentWillUnmount() {
    this.state = ({
      textos: []
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={{backgroundColor: colors.corApp, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <StatusBar backgroundColor={colors.corIconesAtivos} barStyle="light-content" />
          <Image source={require('../../imagens/logo.png')} style={{marginBottom: -10, padding: 0, height:200, width:200}}></Image>
    
            <Text style={estilos.textoTitulo}>{this.state.textos[0]}</Text>

            <Text style={estilos.textoNormal}>{this.state.textos[1]}</Text>

            <Text style={estilos.textoNormalNegrito}>Horário de atendimento</Text>

            <Text style={estilos.textoNormal}>{this.horarioAtendimento()}</Text>
            
            {this.statusCarregar()}
            
        </View>
      </ScrollView>
    );
  }  
}