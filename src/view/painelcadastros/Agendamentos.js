import React from 'react';
import {View, BackHandler, FlatList, Text, TouchableOpacity, Alert, Image} from 'react-native';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

import Base64 from '../../base64/Base64';

export default class Agendamentos extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        arrayAgendamentos: [],
      
        id:'',
        titulo: '',
        texto:'',
        preco: '',
      }
    }

    componentDidMount() {
        this.carregarListaCabeleireiros()
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Cadastramento');
            return true;
        });
    }
    
    componentWillUnmount() {
        this.backHandler.remove();
    }

    carregarListaCabeleireiros = () => {
        var ref = database().ref("/leonbarbershop/agendamentos");
        this.state.arrayAgendamentos = []
    
        ref.on("child_added", (snapshot) => {
            this.setState({ 
                arrayAgendamentos : 
                [...this.state.arrayAgendamentos, ...[
                    {
                    id:snapshot.key,
                    nomeCliente:snapshot.child("nomeCliente").val(),
                    preco:snapshot.child("precoCorte").val(),
                    dia: snapshot.child("dia").val(),
                    mes: snapshot.child("mes").val(),
                    ano: snapshot.child("ano").val(),
                    nomeCorte: snapshot.child("nomeCorte").val(),
                    }
                ]] 
            })
            
        })
    }

    render() {
        return (
            <View style={estilos.viewTabs}>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <FlatList
                data={this.state.arrayAgendamentos}
                renderItem={({ item }) => {
                  return (
                    <View style={[estilos.itemArray, { backgroundColor: colors.corBranca }]}>
                      <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                      <View style={{flexDirection:'column'}}>
                        <Text style={estilos.title}>{item.nomeCliente}</Text>
                        <Text style={estilos.textoNormalProduto}>{item.dia+ "/"+item.mes+"/"+item.ano + " | "+item.nomeCorte}</Text>
                      </View>
                    </View>
                  ) 
                }}
                keyExtractor={item => item.id}
              />
              </ScrollView>
              </View>
              );
              }

}