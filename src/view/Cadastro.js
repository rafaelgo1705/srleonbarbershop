import React from 'react';
import {View, Text, Image, BackHandler, TextInput, TouchableOpacity, ScrollView} from 'react-native';

import estilos from '../styles/estilos';

import CadastroController from '../controller/CadastroController';

export default class Cadastro extends React.Component {
  constructor(props){
    super(props);

    this.state = {text: "", inputNome: ""}
    this.state = {text: "", inputEmail: ""}
    this.state = {text: "", inputTelefone: ""}
    this.state = {text: "", inputSenha: ""}
    this.state = {text: "", inputConfirmarSenha: ""}

    this.cadastroController = new CadastroController();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Login');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  cadastrar = () => {
    this.cadastroController.cadastrar(this.state.inputNome, this.state.inputEmail, this.state.inputTelefone,
    this.state.inputSenha, this.state.inputConfirmarSenha, this.props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
      <View style={estilos.viewInicialLogin}>
        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')} style={estilos.viewInicialCadastro}>
          <Image source={require('../imagens/icons/voltar_icon.png')}></Image>
          <Text style={estilos.textLoginInicial}>Cadastrar</Text>
        </TouchableOpacity>

        <TextInput
          onChangeText={(text) => this.setState({inputNome: text})}
          blurOnSubmit={false} 
          onSubmitEditing={() => { this.email.focus(); }}
          style={estilos.textLoginInput} 
          keyboardType='name-phone-pad' 
          placeholder='Nome...' 
          textContentType='name'>
        </TextInput>

        <TextInput
          onChangeText={(text) => this.setState({inputEmail: text})}
          ref={(input) => { this.email = input; }}
          blurOnSubmit={false} 
          onSubmitEditing={() => { this.telefone.focus(); }}
          style={estilos.textLoginInput} 
          keyboardType='email-address' 
          placeholder='Email...' 
          textContentType='emailAddress'>
        </TextInput>

        <TextInput
          onChangeText={(text) => this.setState({inputTelefone: text})}
          ref={(input) => { this.telefone = input; }}
          blurOnSubmit={false} 
          onSubmitEditing={() => { this.senha.focus(); }}
          style={estilos.textLoginInput} 
          keyboardType='phone-pad' 
          placeholder='Telefone...' 
          textContentType='telephoneNumber'>
        </TextInput>

        <TextInput
          onChangeText={(text) => this.setState({inputSenha: text})}
          ref={(input) => { this.senha = input; }}
          blurOnSubmit={false} 
          onSubmitEditing={() => { this.confirmaSenha.focus(); }}
          style={estilos.textLoginInput} 
          secureTextEntry={true} placeholder='Senha...(Mínimo 6 dígitos)' 
          textContentType='password'>
        </TextInput>

        <TextInput
          onChangeText={(text) => this.setState({inputConfirmarSenha: text})}
          ref={(input) => { this.confirmaSenha = input; }}
          style={estilos.textLoginInput} 
          secureTextEntry={true} 
          placeholder='Confirmar Senha...' 
          textContentType='password'>
        </TextInput>

        <TouchableOpacity onPress={this.cadastrar} style={estilos.buttonLogin}>
          <Text style={estilos.buttonLoginTexto}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={estilos.buttonCadastro}>
          <Text style={estilos.textLoginCadastro}>Já possui uma conta?</Text>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
            <Text style={estilos.textLoginCadastroEvento} >Faça login</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={estilos.textLoginOpcaoCadastro}>Ou cadastre-se com</Text>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={estilos.buttonLoginFacebook}>
            <Image source={require('../imagens/icons/facebook_icon.png')} style={{marginTop: -5, marginRight: 7, height:30, width:30}}></Image>
            <Text style={estilos.buttonLoginTextoFacebook}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.buttonLoginGoogle} title="Google">
            <Image source={require('../imagens/icons/google_icon.png')} style={{marginTop: -5, marginRight: 7, height:30, width:30}}></Image>
            <Text style={estilos.buttonLoginTextoGoogle}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    );
  }
}