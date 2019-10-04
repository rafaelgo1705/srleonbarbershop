import React from 'react';
import {View, BackHandler, ScrollView, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import database from '@react-native-firebase/database';

export default class GestaoCabeleireiros extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      inputNome: "",
      modalVisible: false,
    };
    
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Cadastramento');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  state = {
    verModal: false
  };

  exibirOcultarModal = () => {
    this.setState({ verModal: !this.state.verModal });
  };

  salvarCabeleireiro = () => {
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.push().set({
      nome:this.state.inputNome,
    }).then(() => {
      Alert.alert("Sucesso", "O cabeleireiro foi cadastrado!",
      [
        {text: 'Ok', onPress: this.exibirOcultarModal}
      ])
      
    }).catch(function(){
      Alert.alert("Erro", "Não foi possível cadastrar o cabeleireiro!")
    });
  }

  carregarListaCabeleireiros(){
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.orderByChild("nome").equalTo("Rafael").on("value", (snapshot) => {
      Alert.alert(snapshot.child("nome"))
    })

  }

  render() {
    return (
        <View style={estilos.viewInicialLogin}>
          <Text>Cabeleireiros</Text>
          {this.carregarListaCabeleireiros}
            <Modal isVisible={this.state.verModal} onRequestClose={this.exibirOcultarModal}>
              <View style={{ flex: 1, justifyContent:"center"}}>
                <Text style={estilos.textLoginInicial}>Novo cabeleireiro</Text>
                <TextInput
                  onChangeText={(text) => this.setState({inputNome: text})}
                  blurOnSubmit={false} 
                  style={estilos.textLoginInput} 
                  keyboardType='name-phone-pad' 
                  placeholder='Nome...' 
                  textContentType='name'>
                </TextInput>
                <TouchableOpacity style={estilos.buttonCadastoCabeleireiro} onPress={this.salvarCabeleireiro} >
                  <Text style={estilos.textLoginCadastro}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.buttonExcluirConta} onPress={this.exibirOcultarModal} >
                  <Text style={estilos.textLoginCadastro}>Cancelar</Text>
                </TouchableOpacity>
                
              </View>
            </Modal>

          <ActionButton buttonColor={colors.corButtonLogin} onPress={this.exibirOcultarModal}/>

        </View>
    );
  }
}