import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import estilos from '../../styles/estilos';

export default class Status extends React.Component {
    render() {
      return (
        <ScrollView contentContainerStyle={estilos.scrollViewTabAgenda}>
          <View style={estilos.viewSuperiorStatus}>
              <Text style={estilos.textoNegritoConta}>Status</Text>
          </View>
          <View style={estilos.viewCorpoStatus}>
            <Image source={require('../../imagens/logo.png')} style={{margin: 0, padding: 0, height:150, width:150}}></Image>
            <Text style={estilos.textoNegritoStatus}>Em desenvolvimento</Text>
          </View>
        </ScrollView>
      );
    }
  }