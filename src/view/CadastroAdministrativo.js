import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';

import estilos from '../styles/estilos';

export default class CadastroAdministrativo extends React.Component {
  constructor(props){
    super(props);

  }

  abrirTelaGestaoCabeleireiros = () => {
    this.props.navigation.navigate("GestaoCabeleireiros");
  }

  abrirTelaGestaoCortes = () => {
    this.props.navigation.navigate("GestaoCortes");
  }

  abrirTelaAgendamentos = () => {
    this.props.navigation.navigate("Agendamentos")
  }

  abrirTelaCalendario = () => {
    this.props.navigation.navigate("Calendario")
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewRedefinirSenha}>
          <View style={{alignItems: "center", marginBottom: 20}}>
            <Image source={require('../imagens/logo.png')} style={{alignContent: 'center', marginBottom: -10, padding: 0, height:200, width:200}}></Image>
            <Text style={estilos.textoTitulo}>Menu de opções</Text>
          </View>

          <TouchableOpacity onPress={this.abrirTelaGestaoCabeleireiros} style={estilos.buttonCadastroAgenda}>
            <Text style={estilos.buttonLoginTexto} >Gestão de cabeleireiros</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.abrirTelaGestaoCortes} style={estilos.buttonCadastroAgenda}>
            <Text style={estilos.buttonLoginTexto} >Gestão de cortes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.abrirTelaAgendamentos} style={estilos.buttonCadastroAgenda}>
            <Text style={estilos.buttonLoginTexto} >Agendamentos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.abrirTelaCalendario} style={estilos.buttonCadastroAgenda}>
            <Text style={estilos.buttonLoginTexto} >Calendário</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}