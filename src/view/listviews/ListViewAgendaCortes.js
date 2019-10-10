import React from 'react';
import {SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, Image, View} from 'react-native';

import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

export default class ListViewAgendaCortes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      arrayCortes: [],
      id:'',
      titulo: '',
      texto:'',
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
                  titulo:data.val(),
                  texto: data.val(),
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
              <TouchableOpacity
                style={[
                  estilos.itemArray,
                  { backgroundColor: colors.corBranca },
                ]}>
                <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                <View style={{flexDirection:'column'}}>
                  <Text style={estilos.title}>{item.titulo}</Text>
                  <Text style={estilos.textoNormalProduto}>{item.texto}</Text>
                </View>
                <View style={estilos.estiloPreco}>
                  <Text style={estilos.textoPreco}>{item.preco}</Text>
                </View>
              </TouchableOpacity>
            
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}