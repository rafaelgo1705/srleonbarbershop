import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import estilos from '../styles/estilos';

export default class CadastroAdministrativo extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewRedefinirSenha}>
          <Text style={estilos.textLoginInicial}>Painel</Text>


        </View>
      </ScrollView>
    );
  }
}