import React from 'react';
import {SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, Image, View} from 'react-native';

import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

export default class ListViewAgendaCortes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      arrayCortes: [],
      nome: '',
      preco: '',
    }

  }

  componentDidMount(){
    this.carregarListaCortes();
  }

  carregarListaCortes() {
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.orderByChild("nome").on("child_added", (snapshot) => {
      snapshot.forEach((data) => {  
          this.setState({ 
            arrayCortes : 
              [...this.state.arrayCortes, ...[
                {
                  id:snapshot.key,
                  nome:data.val(),
                  preco:"15"
                }
            ]] 
            })
      });
        
    })

  }

  render() {
    return (
      <View >
        <FlatList
          data={this.state.arrayCortes}
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
                  <Text style={estilos.textoNormalProduto}>{item.preco}</Text>
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