import React from 'react';
import {View, Image, Text, Alert, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import estilos from '../../styles/estilos';

import AgendaController from '../../controller/tabs/AgendaController';

import ListViewAgendaCortes from '../listviews/ListViewAgendaCortes';
import ListViewAgendaCabeleireiros from '../listviews/ListViewAgendaCabeleireiros';

export default class Agenda extends React.Component {
  constructor(props){
    super(props);

    this.state = {text: "", inputNome: ""}

    this.agendaController = new AgendaController();
  }

  salvarAgenda = () => {
    this.agendaController.salvarAgendamento(this.props, this.state.inputNome);
  }
  
    render() {
      return (
        <View style={estilos.viewAgenda}>
          <ScrollView contentContainerStyle={estilos.scrollViewTabAgenda}>
            <View style={estilos.viewSuperiorAgenda}>
              <Image source={require('../../imagens/logo.png')} style={{marginTop: -10, marginBottom: -20, padding: 0, height:170, width:170}}></Image>
              <Text style={estilos.textoTitulo}>Sr. León Barber Shop</Text>
            </View>
            <ListViewAgendaCabeleireiros/>
          </ScrollView>
          <View style={{ justifyContent: 'flex-end'}}>
          <TouchableOpacity style={estilos.buttonAgendar}>
              <Text style={estilos.textoNegritoConta}>Próximo (R$)</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
    }
  }