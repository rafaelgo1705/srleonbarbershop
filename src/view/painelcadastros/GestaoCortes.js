import React from 'react';
import {View, BackHandler, FlatList, Text, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';
export default class GestaoCortes extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inputTitulo: "",
      inputTexto: "",
      inputPreco: "",
      verModal: false,

      inputTituloEditar: "",
      inputPrecoEditar: "",
      inputTextoEditar: "",
      verModalEditar: false,

      tituloCorte: "",
      idCorte: "",
      preco:0.0,
      texto:"",
      verModalEditar: false,
    };

    this.state = ({
      arrayCortes: [],
    })
    
  }

  componentDidMount() {
    this.carregarListaCortes();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Cadastramento');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  exibirOcultarModal = () => {
    this.setState({ verModal: !this.state.verModal });
    
  };

  salvarCorte = () => {
    var ref = database().ref("/leonbarbershop/cortes");

    ref.push().set({
        titulo:this.state.inputTitulo,
        preco:this.state.inputPreco,
        texto:this.state.inputTexto,
    }).then(() => {
      Alert.alert("Sucesso", "O corte foi cadastrado!",
      [
        {text: 'Ok', onPress: this.exibirOcultarModal}
      ])
      this.carregarListaCortes();
      
    }).catch(function(){
      Alert.alert("Erro", "Não foi possível cadastrar o corte!")
    });
  }

  carregarListaCortes = () => {
    var ref = database().ref("/leonbarbershop/cortes");
    this.state.arrayCortes = []

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

  exibirOcultarModalEditar = (item) => {
    this.setState({inputTituloEditar: item.titulo})
    this.setState({inputTextoEditar: item.texto})
    this.setState({inputPrecoEditar: item.preco})
    this.setState({idCorte: item.id})
    this.setState({ verModalEditar: !this.state.verModalEditar });
  }

  editarCorte = () => {
    var ref = database().ref("/leonbarbershop/cortes/"+this.state.idCorte);

    ref.set({
      titulo:this.state.inputTituloEditar,
      preco:this.state.inputPrecoEditar,
      texto:this.state.inputTextoEditar,
    }).then(() => {
      Alert.alert("Sucesso", "O corte foi alterado!",[
        {
          text:"Ok", onPress: () => {
            this.setState({ verModalEditar: !this.state.verModalEditar })
            this.carregarListaCortes()
          }   
        }
      ])
    })
  }

  excluirCorte = (item) => {
    var ref = database().ref("/leonbarbershop/cortes/"+item.id);
    Alert.alert("Apagar", "Deseja apagar o corte " +item.titulo+" na "+item.texto+ "?",
        [
            {
                text: 'Não', onPress: () => 
                console.log('Não pressed')
            },
            {
                text: 'Sim', onPress: () => 
                  ref.remove().then(() => {
                    Alert.alert("Sucesso", "O corte " +item.titulo+ " foi apagado!")
                    this.carregarListaCortes();

                  }).catch((error) => {
                    Alert.alert("Erro", "Não foi possível deletar "+item.titulo)
                  })
            }
        ]);
  }

  render() {
    return (
        <View style={estilos.viewTabs}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <FlatList
            data={this.state.arrayCortes}
            renderItem={({ item }) => {
              return (
                <View style={[estilos.itemArray, { backgroundColor: colors.corBranca }]}>
                  <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                  <View style={{flexDirection:'column'}}>
                    <Text style={estilos.title}>{item.titulo + " | R$ " + item.preco + ",00"}</Text>
                    <Text style={estilos.textoNormalProduto}>{item.texto}</Text>
                  </View>
                  <View style={{flex: 1, flexDirection:"column", alignItems:"flex-end", justifyContent: "center", marginRight: 0}}>
                    <View style={{flexDirection:"row"}}>
                      <TouchableOpacity onPress={() => this.exibirOcultarModalEditar(item)}>
                        <Image source={require('../../imagens/icons/icon_edit_black.png')} style={{justifyContent: 'center', alignContent: 'center', marginRight: 10, height:30, width:30}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.excluirCorte(item)}>
                        <Image source={require('../../imagens/icons/icon_delete.png')} style={{justifyContent: 'center', alignContent: 'center', marginBottom: 0, padding: 0, height:35, width:35}}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) 
            }}
            keyExtractor={item => item.id}
          />
          </ScrollView>
          
            <Modal isVisible={this.state.verModal} onRequestClose={this.exibirOcultarModal}>
              <View style={{ flex: 1, justifyContent:"center"}}>
                <Text style={estilos.textLoginInicial}>Novo corte</Text>
                <TextInput
                  onChangeText={(text) => this.setState({inputTitulo: text})}
                  blurOnSubmit={false} 
                  style={estilos.textLoginInput} 
                  keyboardType='name-phone-pad' 
                  placeholder='Nome...' 
                  textContentType='name'>
                </TextInput>
                <TextInput
                  onChangeText={(text) => this.setState({inputTexto: text})}
                  blurOnSubmit={false} 
                  style={estilos.textLoginInput} 
                  keyboardType='name-phone-pad' 
                  placeholder='Texto...' 
                  textContentType='name'>
                </TextInput>
                <TextInput
                  onChangeText={(text) => this.setState({inputPreco: text})}
                  style={estilos.textLoginInput} 
                  keyboardType='numeric' 
                  placeholder='Preço...' >
                </TextInput>
                <TouchableOpacity style={estilos.buttonCadastoCabeleireiro} onPress={this.salvarCorte} >
                  <Text style={estilos.textLoginCadastro}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.buttonExcluirConta} onPress={this.exibirOcultarModal} >
                  <Text style={estilos.textLoginCadastro}>Cancelar</Text>
                </TouchableOpacity>
                
              </View>
            </Modal>

            <Modal isVisible={this.state.verModalEditar} onRequestClose={this.exibirOcultarModalEditar}>
              <View style={{ flex: 1, justifyContent:"center"}}>
                <Text style={estilos.textLoginInicial}>{this.state.tituloCorte}</Text>
                <TextInput
                  onChangeText={(text) => this.setState({inputTituloEditar: text})}
                  blurOnSubmit={false} 
                  style={estilos.textLoginInput} 
                  keyboardType='name-phone-pad' 
                  placeholder='Nome...' 
                  textContentType='name'>{this.state.inputTituloEditar}
                </TextInput>
                <TextInput
                  onChangeText={(text) => this.setState({inputTextoEditar: text})}
                  blurOnSubmit={false} 
                  style={estilos.textLoginInput} 
                  keyboardType='name-phone-pad' 
                  placeholder='Texto...' 
                  textContentType='name'>{this.state.inputTextoEditar}
                </TextInput>
                <TextInput
                  onChangeText={(text) => this.setState({inputPrecoEditar: text})}
                  style={estilos.textLoginInput} 
                  keyboardType='numeric' 
                  placeholder='Preço...' >{this.state.inputPrecoEditar}
                </TextInput>
                  <TouchableOpacity style={estilos.buttonCadastoCabeleireiro} onPress={this.editarCorte}>
                    <Text style={estilos.textLoginCadastro}>Alterar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={estilos.buttonExcluirConta} onPress={this.exibirOcultarModalEditar} >
                    <Text style={estilos.textLoginCadastro}>Cancelar</Text>
                  </TouchableOpacity>      
              </View>
            </Modal>  
            <ActionButton buttonColor={colors.corButtonLogin} onPress={this.exibirOcultarModal}/>
            <ActionButton position="left" buttonColor={colors.corVermelhaApp} onPress={() => this.props.navigation.navigate("Cadastramento")}/>
        </View>
    );
  }
}