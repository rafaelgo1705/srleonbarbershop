import React, {Component} from 'react';
import {View, Image, Text, StatusBar, ScrollView} from 'react-native';
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
      arrayHorarios:[],
    });

  }

  preencherTextos() {
    const ref = database().ref("/leonbarbershop/textos");

    ref.on("value", (snapshot) => {
      let textos = [];
      textos = [
        snapshot.child("textoTitulo").val(),
        snapshot.child("textoNormal").val(), 
        snapshot.child("statusAtendimento").val(),
        snapshot.child("horarioAtendimento/0/SegSexInicio").val(),
        snapshot.child("horarioAtendimento/0/SegSexFim").val(),
        snapshot.child("horarioAtendimento/0/SabInicio").val(),
        snapshot.child("horarioAtendimento/0/SabFim").val(),
        snapshot.child("horarioAtendimento/0/DomInicio").val(),
        snapshot.child("horarioAtendimento/0/DomFim").val(),
      ]

      this.setState({textos:textos})
      this.verificarHora();
    });
  }

  diaDaSemana(date) {
    var semana = new Array(7);
    semana[0] = "Domingo";
    semana[1] = "SegSex";
    semana[2] = "SegSex";
    semana[3] = "SegSex";
    semana[4] = "SegSex";
    semana[5] = "SegSex";
    semana[6] = "Sabado";
    
    return semana[date.getDay()];
  }

  verificarHora(){
    var dayOfWeek = moment().toDate();
    var diaDaSemana = this.diaDaSemana(dayOfWeek);

    var hora = moment().format('HH');
    if(diaDaSemana == "SegSex"){
      if(hora >= this.state.textos[3] && hora < this.state.textos[4]){
        let arrayHorarios = [{
          SegSexInicio:this.state.textos[3],
          SegSexFim:this.state.textos[4],
          SabInicio:this.state.textos[5],
          SabFim:this.state.textos[6],
          DomInicio:this.state.textos[7],
          DomFim:this.state.textos[8],
        }]

        const ref = database().ref("/leonbarbershop/textos");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: true,
          horarioAtendimento: arrayHorarios
        })

      }else if(hora < this.state.textos[3] || hora >= this.state.textos[4]){
        let arrayHorarios = [{
          SegSexInicio:this.state.textos[3],
          SegSexFim:this.state.textos[4],
          SabInicio:this.state.textos[5],
          SabFim:this.state.textos[6],
          DomInicio:this.state.textos[7],
          DomFim:this.state.textos[8],
        }]

        const ref = database().ref("/leonbarbershop/textos");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: false,
          horarioAtendimento: arrayHorarios
        })
      }

    }else if(diaDaSemana == "Sabado"){
      if(hora >= this.state.textos[5] && hora < this.state.textos[6]){
        let arrayHorarios = [{
          SegSexInicio:this.state.textos[3],
          SegSexFim:this.state.textos[4],
          SabInicio:this.state.textos[5],
          SabFim:this.state.textos[6],
          DomInicio:this.state.textos[7],
          DomFim:this.state.textos[8],
        }]

        const ref = database().ref("/leonbarbershop/textos");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: true,
          horarioAtendimento: arrayHorarios
        })

      }else if(hora < this.state.textos[3] || hora >= this.state.textos[4]){
        let arrayHorarios = [{
          SegSexInicio:this.state.textos[3],
          SegSexFim:this.state.textos[4],
          SabInicio:this.state.textos[5],
          SabFim:this.state.textos[6],
          DomInicio:this.state.textos[7],
          DomFim:this.state.textos[8],
        }]

        const ref = database().ref("/leonbarbershop/textos");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: false,
          horarioAtendimento: arrayHorarios
        })
      }

    }else if(diaDaSemana == "Domingo"){
      if(hora >= this.state.textos[7] && hora < this.state.textos[8]){
        let arrayHorarios = [{
          SegSexInicio:this.state.textos[3],
          SegSexFim:this.state.textos[4],
          SabInicio:this.state.textos[5],
          SabFim:this.state.textos[6],
          DomInicio:this.state.textos[7],
          DomFim:this.state.textos[8],
        }]

        const ref = database().ref("/leonbarbershop/textos");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: true,
          horarioAtendimento: arrayHorarios
        })

      }else if(hora < this.state.textos[3] || hora >= this.state.textos[4]){
        let arrayHorarios = [{
          SegSexInicio:this.state.textos[3],
          SegSexFim:this.state.textos[4],
          SabInicio:this.state.textos[5],
          SabFim:this.state.textos[6],
          DomInicio:this.state.textos[7],
          DomFim:this.state.textos[8],
        }]

        const ref = database().ref("/leonbarbershop/textos");

        ref.set({
          textoTitulo: this.state.textos[0],
          textoNormal: this.state.textos[1],
          statusAtendimento: false,
          horarioAtendimento: arrayHorarios
        })
      }
    }    
  }

  horarioAtendimento(){
    var horarios = "";
    if(this.state.textos[3] != null && this.state.textos[4] != null){
      horarios += "Seg à Sex " + this.state.textos[3] + ":00 - " + this.state.textos[4] + ":00";
    
    } 
    if(this.state.textos[5] != null && this.state.textos[6] != null){
      horarios += "\nSábado " +this.state.textos[5] +":00 - " + this.state.textos[6] + ":00";

    }
    if(this.state.textos[7] != null && this.state.textos[8] != null){
      horarios += "\nDomingo " +this.state.textos[7] +":00 - " + this.state.textos[8] + ":00";

    }

    return (
      <Text style={estilos.textoNormalNegrito}> {horarios} </Text>
         
    );
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

            {this.horarioAtendimento()}
            
            {this.statusCarregar()}
            
        </View>
      </ScrollView>
    );
  }  
}