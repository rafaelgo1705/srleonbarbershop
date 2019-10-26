import React from 'react';
import {View, Image, Text, Alert, FlatList, ScrollView, TouchableOpacity} from 'react-native';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import AgendaController from '../../controller/tabs/AgendaController';

import ListViewAgendaCortes from '../listviews/ListViewAgendaCortes';
import ListViewAgendaCabeleireiros from '../listviews/ListViewAgendaCabeleireiros';

import database from '@react-native-firebase/database';

export default class Agenda extends React.Component {
  constructor(props){
    super(props);

    this.state = {text: "", inputNome: ""}

    this.agendaController = new AgendaController();

    this.state = {
      verTela: 0,
      corte: [],
      cabeleireiro: [],
      data: '',
      horario: '',

      //Listar cabeleireiros
      statusCabeleireiro: false,
      arrayCabeleireiros: [],
      nome: '',
      avaliacao: '',

      //Listrar Cortes
      statusCorte: true,
      arrayCortes: [],
      id:'',
      titulo: '',
      texto:'',
      preco: '',
    }
  }

  componentDidMount(){
    this.carregarListaCortes();
    //this.carregarListaCabeleireiros();
  }

  mudarTela = (idCorte, verTela) => {
    //console.log("idCorte: " +idCorte)

    if(verTela == 0){
      this.carregarListaCortes();
      this.setState({verTela:0})

    }else if(verTela == 1){
      this.carregarListaCabeleireiros(idCorte);
      this.setState({verTela:1})
    }else{
      return null;
    }
  }

  telaCortes(){
    return(
      <View>
            <Text style={estilos.textoNegritoAgenda}>Selecione o corte</Text>
            <FlatList
              data={this.state.arrayCortes}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.mudarTela(item.idCorte, 1)}
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
              keyExtractor={item => item.idCorte}
            />
          </View>
    );
  }

  telaCabeleireiros = () => {
    return (
      <View >
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.mudarTela("", 0)}>
            <Image style={{width: 30, height: 30, marginLeft: 5}} source={require('../../imagens/icons/icon_voltar_seta_black.png')}></Image>
          </TouchableOpacity>
          <Text style={estilos.textoNegritoAgenda}>Selecione o cabeleireiro</Text>
        </View>
        
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

  telaData = () => {
    
  }

  salvarAgenda = () => {
    this.agendaController.salvarAgendamento(this.props, this.state.inputNome);
  }

  carregarListaCortes() {
    this.setState({arrayCortes:[]})
    var ref = database().ref("/leonbarbershop/cortes");

    ref.orderByChild("titulo").on("child_added", (snapshot) => {
      this.setState({ 
        arrayCortes : 
          [...this.state.arrayCortes, ...[
            {   
              idCorte:snapshot.key,
              titulo:snapshot.child("titulo").val(),
              preco:snapshot.child("preco").val(),
              texto:snapshot.child("texto").val()
            }
        ]] 
        })
        
    })
  }

  carregarListaCabeleireiros(idCorte) {
    this.setState({arrayCabeleireiros:[]})
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.orderByChild("nome").on("child_added", (snapshot) => {
      ref.child(snapshot.key).child("cortes").orderByChild("idCorte").equalTo(idCorte).on("child_added", (snap) => {
        console.log(idCorte, snap.child("idCorte"))
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
    })
  }
  
    render() {
      return (
        <View style={estilos.viewAgenda}>
          <ScrollView contentContainerStyle={estilos.scrollViewTabAgenda}>
            <View style={estilos.viewSuperiorAgenda}>
              <Image source={require('../../imagens/logo.png')} style={{marginTop: -10, marginBottom: -20, padding: 0, height:170, width:170}}></Image>
              <Text style={estilos.textoTitulo}>Sr. León Barber Shop</Text>
            </View>
            <View>
              {this.state.verTela == 0 ? this.telaCortes() : null}
              {this.state.verTela == 1 ? this.telaCabeleireiros() : null}
            </View>

          </ScrollView>
          
      </View>
      );
    }
  }