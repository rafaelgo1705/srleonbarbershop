import React from 'react';
import {TouchableOpacity, Alert, FlatList, Text, Image, View} from 'react-native';

import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

import database from '@react-native-firebase/database';
import ListViewAgendaCabeleireiros from './ListViewAgendaCabeleireiros';
import Agenda from '../tabs/Agenda';

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
    var ref = database().ref("/leonbarbershop/cortes");

    ref.orderByChild("titulo").on("child_added", (snapshot) => {
      this.setState({ 
        arrayCortes : 
          [...this.state.arrayCortes, ...[
            {   
              id:snapshot.key,
              titulo:snapshot.child("titulo").val(),
              preco:snapshot.child("preco").val(),
              texto:snapshot.child("texto").val()
            }
        ]] 
        })
        
    })

  }

  escolherCabeleireiro = (item) => {
    let arrayAgenda = [];
    arrayAgenda = [item]
    this.agenda = new Agenda();

    this.agenda.state = {
      arrayAgenda:arrayAgenda
    }

    this.agenda.proximaTela()

    console.log(this.agenda.state.arrayAgenda)
  }

  render() {
    return (
      <View >
        <Text>Selecione o corte</Text>
        <FlatList
          data={this.state.arrayCortes}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => this.escolherCabeleireiro(item)}
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
                  <Text style={estilos.textoPreco}>{"R$ " + item.preco}</Text>
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