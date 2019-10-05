import React from 'react';
import {SafeAreaView, TouchableOpacity, FlatList, Text, Image, View} from 'react-native';

import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

import database from '@react-native-firebase/database';

export default class GestaoCabeleireiros extends React.Component {
  constructor(props){
    super(props);

    this.state = ({
      arrayCabeleireiros: [],
    })

    this.carregarListaCabeleireiros();
    
  }

  carregarListaCabeleireiros = () => {
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.orderByChild("nome").on("child_added", (snapshot) => {
      snapshot.forEach((data) => {      
          let nomes = [];
          nomes = [
            data.val(),
            data.key,
            "avaliacao",
          ]

          this.setState({arrayCabeleireiros:nomes})
          console.log("Nome: "+ this.state.arrayCabeleireiros[0]+ " | " + snapshot.key);  
      });
    })
  }

  Item( id, nome, avaliacao ) {
    return (
      <TouchableOpacity
        style={[
          estilos.item,
          { backgroundColor: colors.corBranca },
        ]}
      >
        <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
        <View style={{flexDirection:'column'}}>
          <Text style={estilos.title}>{nome}</Text>
          <Text style={estilos.textoNormalProduto}>{avaliacao}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View >
        <FlatList
          data={this.state.arrayCabeleireiros}
          renderItem={this.Item}
          keyExtractor={item => item.uid}
        />
      </View>
    );
  }
}