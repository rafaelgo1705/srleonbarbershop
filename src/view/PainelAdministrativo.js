import React from 'react';
import {View, Text, Image, Picker, BackHandler, Switch, Alert, TouchableOpacity, TextInput, ScrollView} from 'react-native';

import estilos from '../styles/estilos';

import database from '@react-native-firebase/database';

import moment from 'moment';

export default class PainelAdministrativo extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inputTitulo: "",
      text: "", 
      inputTexto: "", 
      statusBarbearia: false,
      textos: []
    };

    this.carregarDados();
  }

  carregarDados = () => {
    var ref = database().ref("/leonbarbershop/painel/textos");

    ref.once("value", (snapshot) => {
      let textos = [];
      textos = [
        snapshot.child("textoTitulo").val(),
        snapshot.child("textoNormal").val(),
        snapshot.child("statusAtendimento").val(),  
      ]

      this.setState({textos:textos})
      
      this.setState({inputTitulo:textos[0]})
      this.setState({inputTexto:textos[1]})
      this.setState({statusBarbearia:textos[2]})
    });
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Conta');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();

    this.state = {
      inputTitulo: "", 
      text: "", 
      inputTexto: "",
      statusBarbearia: false,
      textos: [],
    }
  }

  alterarDados = () => {
      var ref = database().ref('/leonbarbershop/painel/textos');

      var titulo = this.state.inputTitulo;
      var texto = this.state.inputTexto;
      var statusBarbearia = this.state.statusBarbearia;

      if(this.validarCampos(titulo, texto)){
        ref.set({
          textoTitulo: titulo,
          textoNormal: texto,
          statusAtendimento: statusBarbearia,

        }).then(function(){
          Alert.alert("Sucesso", "Os dados foram alterados!")
        }).catch(function(){
          Alert.alert("Erro", "Não foi possível alterar os dados!")
        });
      }
  }

  validarCampos(titulo, texto){
    var erro = "";

    if(titulo == "" || titulo == null){
      erro += "O campo Título está vazio!\n"
    }
    if(texto == "" || texto == null){
      erro += "O campo Texto está vazio!\n"
    }

    if(erro.length == 0){
      return true;

    }else{
      Alert.alert("Erro", erro)
      return false;
    }

  }

  selecionarStatus = (value) => {
    this.setState({statusBarbearia: value});

  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewRedefinirSenha}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Conta')} style={estilos.viewInicialCadastro}>
              <Image source={require('../imagens/icons/voltar_icon.png')}></Image>
              <Text style={estilos.textLoginInicial}>Painel</Text>
            </TouchableOpacity>

          <TextInput
                maxLength={35}
                onChangeText={inputTitulo => this.setState({inputTitulo:inputTitulo})}
                value={this.state.inputTitulo}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.inputTexto.focus(); }}
                style={estilos.textLoginInput} 
                placeholder='Título...' 
                textContentType='none'>
            </TextInput>

            <TextInput
                multiline
                numberOfLines={4}
                maxLength={200}
                onChangeText={inputTexto => this.setState({inputTexto:inputTexto})}
                value={this.state.inputTexto}
                ref={(input) => { this.inputTexto = input; }}
                style={estilos.textInputTexto} 
                placeholder='Texto de início...'
                textContentType='none'>
            </TextInput>            

          <View style={estilos.viewPainelAdminStatus}>
            <Switch style={estilos.switchStatusBarbearia} onValueChange = {this.selecionarStatus} value = {this.state.statusBarbearia}/>
            <Text style={estilos.textoStatus}>{this.state.statusBarbearia ? 'Aberto agora' : 'Fechado'}</Text>     
          </View>

          <TouchableOpacity onPress={this.alterarDados} style={estilos.buttonRedefinirSenhaAlterar}>
            <Text style={estilos.buttonLoginTexto} >Alterar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}