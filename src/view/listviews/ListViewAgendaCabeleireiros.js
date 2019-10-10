import React from 'react';
import {TouchableOpacity, FlatList, Text, Image, View} from 'react-native';

import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

import database from '@react-native-firebase/database';

export default class ListViewAgendaCabeleireiros extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      arrayCabeleireiros: [],
      nome: '',
      avaliacao: '',
    }

  }

  componentDidMount(){
    this.carregarListaCabeleireiros();
  }

  carregarListaCabeleireiros() {
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.orderByChild("nome").on("child_added", (snapshot) => {
      this.setState({ 
        arrayCabeleireiros : 
          [...this.state.arrayCabeleireiros, ...[
            {
              id:snapshot.key,
              nome:snapshot.child("nome").val(),
              avaliacao:snapshot.child("avaliacao").val(),
            }
        ]] 
        })
        
    })

  }

  render() {
    return (
      <View >
        <FlatList
          data={this.state.arrayCabeleireiros}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[
                  estilos.itemArray,
                  { backgroundColor: colors.corBranca },
                ]}
              >
                <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                <View style={{flexDirection:'column'}}>
                  <Text style={estilos.title}>{item.nome}</Text>
                  <Text style={estilos.textoNormalProduto}>{item.avaliacao}</Text>
                </View>
              </TouchableOpacity>
            ) 
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}