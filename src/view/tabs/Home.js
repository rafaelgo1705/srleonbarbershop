import React from 'react';
import {View, Image, Text, Alert, StatusBar, ScrollView} from 'react-native';
import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import HomeController from '../../controller/tabs/HomeController';

export default class Home extends React.Component {
  state = { currentUser: null }

  constructor(props) {
    super(props);

    this.state = {text:"", statusBarbearia: ""},

    this.state = ({
      textos: []
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
        snapshot.child("horarioAtendimento/0").val(),
      ]

      this.setState({textos:textos})

    });
  }

  diaDaSemana(date) {
    var data = new Date(date).getDay();    
    return isNaN(data) ? null : ['DomInicio', 'SegSexInicio', 'SegSexInicio', 'SegSexInicio', 'SegSexInicio', 'SegSexInicio', 'SabInicio'][data];
  }

  verificarHora(){
    var date = new Date();
    var hora = date.getHours();
    var diaDaSemana = this.diaDaSemana(date.getDate())

    //if(diaDaSemana == this.state.textos[10]){
      if(hora >= this.state.textos[3] && hora < this.state.textos[4]){
        return (
          <Text style={estilos.textoStatusBarbeariaAberto}>Aberto agora</Text>
          
        );  

      }else{
        return (
          <Text style={estilos.textoStatusBarbeariaFechado}>Fechado</Text>
        
        );
        
      }

    //}else if(diaDaSemana == this.state.textos[5]){


    //}else if(diaDaSemana == this.state.textos[7]){
      
    
    //}    
  }

  horarioAtendimento(){
    var horarioAtendimento = "Seg à Sex " + this.state.textos[3] + ":00 - " + this.state.textos[4] +":00 e Sáb " + this.state.textos[5] + ":00 - " + this.state.textos[6] + ":00";

    return horarioAtendimento;
  }

  /*statusCarregar(){
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
  }*/

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

            <Text style={estilos.textoNormalNegrito}>Horário de atendimento</Text>

            <Text onPress={this.verificarHora} style={estilos.textoNormal}>{this.horarioAtendimento()}</Text>
            
            {this.verificarHora()}
            
        </View>
      </ScrollView>
    );
  }  
}