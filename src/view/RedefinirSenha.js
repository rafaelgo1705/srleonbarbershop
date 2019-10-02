import React from 'react';
import {View, Text, BackHandler, TextInput, TouchableOpacity, ScrollView} from 'react-native';

import estilos from '../styles/estilos';

import RedefinirSenhaController from '../controller/RedefinirSenhaController';

export default class RedefinirSenha extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {text: "", inputSenhaAtual: ""}
    this.state = {text: "", inputSenhaNova: ""}
    this.state = {text: "", inputSenhaNovaConfirma: ""}

    this.redefinirSenhaController = new RedefinirSenhaController();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Conta');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  alterarSenha = () => {
    this.redefinirSenhaController.alterar(this.state.inputSenhaAtual, this.state.inputSenhaNova, this.state.inputSenhaNovaConfirma);
  }

  cancelar = () => {
    this.props.navigation.navigate('Conta');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewRedefinirSenha}>
          <Text style={estilos.textLoginInicial}>Alterar Senha</Text>
          <TextInput 
            onChangeText={(text) => this.setState({inputSenhaAtual: text})}
            onSubmitEditing={() => { this.senhaNova.focus(); }} 
            blurOnSubmit={false}
            style={estilos.textLoginInput} 
            secureTextEntry={true} 
            placeholder='Senha Atual...' 
            textContentType='password'>
          </TextInput>

          <TextInput 
            onChangeText={(text) => this.setState({inputSenhaNova: text})}
            blurOnSubmit={false}
            ref={(input) => { this.senhaNova = input; }}
            onSubmitEditing={() => { this.senhaNovaConfirma.focus(); }} 
            style={estilos.textLoginInput} 
            secureTextEntry={true} 
            placeholder='Nova senha...(No mínimo 6 caracteres)' 
            textContentType='password'>
          </TextInput>

          <TextInput 
            onChangeText={(text) => this.setState({inputSenhaNovaConfirma: text})}
            ref={(input) => { this.senhaNovaConfirma = input; }} 
            style={estilos.textLoginInput} 
            secureTextEntry={true} 
            placeholder='Confirmar nova senha...' 
            textContentType='password'>
          </TextInput>

          <TouchableOpacity onPress={this.alterarSenha} style={estilos.buttonRedefinirSenhaAlterar}>
            <Text style={estilos.buttonLoginTexto} >Alterar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.cancelar} style={estilos.buttonRedefinirSenhaCancelar}>
            <Text style={estilos.buttonLoginTexto} >Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}