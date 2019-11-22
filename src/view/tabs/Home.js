import React, {Component} from 'react';
import {View, Image, Text, StatusBar, ScrollView, Alert} from 'react-native';
import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import moment from 'moment';

export default class Home extends React.Component {
  state = { currentUser: null }

  constructor(props) {
    super(props);

    this.state = {
      text:"", 
      statusBarbearia: "",
      time: '',
    
      textos: [],
      arrayHorarios:[],

      horaTerminoDom: "",
      horaInicioSeg: "",
      horaInicioTer: "",
      horaInicioQua: "",
      horaInicioQui: "",
      horaInicioSex: "",
      horaInicioSab: "",
      horaTerminoDom: "",
      horaTerminoSeg: "",
      horaTerminoTer: "",
      horaTerminoQua: "",
      horaTerminoQui: "",
      horaTerminoSex: "",
      horaTerminoSab: "",

      minutoInicioDom: "",
      minutoInicioSeg: "",
      minutoInicioTer: "",
      minutoInicioQua: "",
      minutoInicioQui: "",
      minutoInicioSex: "",
      minutoInicioSab: "",
      minutoTerminoDom: "",
      minutoTerminoSeg: "",
      minutoTerminoTer: "",
      minutoTerminoQua: "",
      minutoTerminoQui: "",
      minutoTerminoSex: "",
      minutoTerminoSab: "",
    };

  }

  preencherTextos() {
    const ref = database().ref("/leonbarbershop/painel/textos");

    ref.on("value", (snapshot) => {
      let textos = [];
      textos = [
        snapshot.child("textoTitulo").val(),
        snapshot.child("textoNormal").val(), 
        snapshot.child("statusAtendimento").val(),
  
      ]

      this.setState({textos:textos})
      this.verificarHora();
    });
  }

  carregarHorarios = () => {
    const ref = database().ref("/leonbarbershop/painel/horarioAtendimento");

    ref.orderByChild("horaInicio").on("child_added", (snapshot) => {
      var horaInicioDom = snapshot.child("1/horaInicio").val()
      var minutoInicioDom = snapshot.child("1/minutoInicio").val()
      var horaTerminoDom = snapshot.child("2/horaTermino").val()
      var minutoTerminoDom = snapshot.child("2/minutoTermino").val()

      var horaInicioSeg = snapshot.child("3/horaInicio").val()
      var minutoInicioSeg = snapshot.child("3/minutoInicio").val()
      var horaTerminoSeg = snapshot.child("4/horaTermino").val()
      var minutoTerminoSeg = snapshot.child("4/minutoTermino").val()

      var horaInicioTer = snapshot.child("5/horaInicio").val()
      var minutoInicioTer = snapshot.child("5/minutoInicio").val()
      var horaTerminoTer = snapshot.child("6/horaTermino").val()
      var minutoTerminoTer = snapshot.child("6/minutoTermino").val()

      var horaInicioQua = snapshot.child("7/horaInicio").val()
      var minutoInicioQua = snapshot.child("7/minutoInicio").val()
      var horaTerminoQua = snapshot.child("8/horaTermino").val()
      var minutoTerminoQua = snapshot.child("8/minutoTermino").val()

      var horaInicioQui = snapshot.child("9/horaInicio").val()
      var minutoInicioQui = snapshot.child("9/minutoInicio").val()
      var horaTerminoQui = snapshot.child("10/horaTermino").val()
      var minutoTerminoQui = snapshot.child("10/minutoTermino").val()

      var horaInicioSex = snapshot.child("11/horaInicio").val()
      var minutoInicioSex = snapshot.child("11/minutoInicio").val()
      var horaTerminoSex = snapshot.child("12/horaTermino").val()
      var minutoTerminoSex = snapshot.child("12/minutoTermino").val()

      var horaInicioSab = snapshot.child("13/horaInicio").val()
      var minutoInicioSab = snapshot.child("13/minutoInicio").val()
      var horaTerminoSab = snapshot.child("14/horaTermino").val()
      var minutoTerminoSab = snapshot.child("14/minutoTermino").val()

      if((!horaInicioDom == "" || !horaInicioDom == null) && (!minutoInicioDom == "" || !minutoInicioDom == null) && (!horaTerminoDom == "" || !horaTerminoDom == null) && (!minutoTerminoDom == "" || !minutoTerminoDom == null)){
        this.setState({
          horaInicioDom:horaInicioDom,
          minutoInicioDom:minutoInicioDom,
          horaTerminoDom:horaTerminoDom,
          minutoTerminoDom:minutoTerminoDom,
        }, ()=>{
          console.log("Aqui" + this.state.horaInicioDom)
        })

      }else if((!horaInicioSeg == "" || !horaInicioSeg == null) && (!minutoInicioSeg == "" || !minutoInicioSeg == null) && (!horaTerminoSeg == "" || !horaTerminoSeg == null) && (!minutoTerminoSeg == "" || !minutoTerminoSeg == null)){
        this.setState({
          horaInicioSeg:horaInicioSeg,
          minutoInicioSeg:minutoInicioSeg,
          horaTerminoSeg:horaTerminoSeg,
          minutoTerminoSeg:minutoTerminoSeg,
        })

      }else if((!horaInicioTer == "" || !horaInicioTer == null) && (!minutoInicioTer == "" || !minutoInicioTer == null) && (!horaTerminoTer == "" || !horaTerminoTer == null) && (!minutoTerminoTer == "" || !minutoTerminoTer == null)){
        this.setState({
          horaInicioTer:horaInicioTer,
          minutoInicioTer:minutoInicioTer,
          horaTerminoTer:horaTerminoTer,
          minutoTerminoTer:minutoTerminoTer,
        })

      }else if((!horaInicioQua == "" || !horaInicioQua == null) && (!minutoInicioQua == "" || !minutoInicioQua == null) && (!horaTerminoQua == "" || !horaTerminoQua == null) && (!minutoTerminoQua == "" || !minutoTerminoQua == null)){
        this.setState({
          horaInicioQua:horaInicioQua,
          minutoInicioQua:minutoInicioQua,
          horaTerminoQua:horaTerminoQua,
          minutoTerminoQua:minutoTerminoQua,
        })

      }else if((!horaInicioQui == "" || !horaInicioQui == null) && (!minutoInicioQui == "" || !minutoInicioQui == null) && (!horaTerminoQui == "" || !horaTerminoQui == null) && (!minutoTerminoQui == "" || !minutoTerminoQui == null)){
        this.setState({
          horaInicioQui:horaInicioQui,
          minutoInicioQui:minutoInicioQui,
          horaTerminoQui:horaTerminoQui,
          minutoTerminoQui:minutoTerminoQui,
        })

      }else if((!horaInicioSex == "" || !horaInicioSex == null) && (!minutoInicioSex == "" || !minutoInicioSex == null) && (!horaTerminoSex == "" || !horaTerminoSex == null) && (!minutoTerminoSex == "" || !minutoTerminoSex == null)){
        this.setState({
          horaInicioSex:horaInicioSex,
          minutoInicioSex:minutoInicioSex,
          horaTerminoSex:horaTerminoSex,
          minutoTerminoSex:minutoTerminoSex,
        })

      }else if((!horaInicioSab == "" || !horaInicioSab == null) && (!minutoInicioSab == "" || !minutoInicioSab == null) && (!horaTerminoSab == "" || !horaTerminoSab == null) && (!minutoTerminoSab == "" || !minutoTerminoSab == null)){
        this.setState({
          horaInicioSab:horaInicioSab,
          minutoInicioSab:minutoInicioSab,
          horaTerminoSab:horaTerminoSab,
          minutoTerminoSab:minutoTerminoSab,
        })
      }
    })
  }

  diaDaSemana(date) {
    var semana = new Array(7);
    semana[0] = "Dom";
    semana[1] = "Seg";
    semana[2] = "Ter";
    semana[3] = "Qua";
    semana[4] = "Qui";
    semana[5] = "Sex";
    semana[6] = "Sab";
    
    return semana[date.getDay()];
  }

  verificarHora(){
    /*var dayOfWeek = moment().toDate();
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
    }*/ 
  }

  horarioAtendimento(){
    var horarios = "";
    horarios = "Seg " + this.state.horaInicioSeg + ":" + this.state.minutoInicioSeg + " às " + this.state.horaTerminoSeg + ":" + this.state.minutoTerminoSeg + "\n" +
    "Ter " + this.state.horaInicioTer + ":" + this.state.minutoInicioTer + " às " + this.state.horaTerminoTer + ":" + this.state.minutoTerminoTer + "\n" +
    "Qua " + this.state.horaInicioQua + ":" + this.state.minutoInicioQua + " às " + this.state.horaTerminoQua + ":" + this.state.minutoTerminoQua + "\n" +
    "Qui " +this.state.horaInicioQui + ":" + this.state.minutoInicioQui + " às " + this.state.horaTerminoQui + ":" + this.state.minutoTerminoQui + "\n" + 
    "Sex " + this.state.horaInicioSex + ":" + this.state.minutoInicioSex + " às " + this.state.horaTerminoSex + ":" + this.state.minutoTerminoSex + "\n" +
    "Sab " + this.state.horaInicioSab + ":" + this.state.minutoInicioSab + " às " + this.state.horaTerminoSab + ":" + this.state.minutoTerminoSab + "\n"

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
    this.carregarHorarios();
  }

  componentWillUnmount() {
    this.state = {
      textos: []
    }
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