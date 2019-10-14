import React from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native';

import estilos from '../styles/estilos';

import LoginController from '../controller/LoginController';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {text: "", inputEmail: ""}
    this.state = {text: "", inputSenha: ""}

    this.loginController = new LoginController();

  }

  entrarApp = () => {
    this.loginController.entrar(this.state.inputEmail, this.state.inputSenha, this.props);
    
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewInicialLogin}>
          <View style={estilos.viewInicialCadastro}>
            <Text style={estilos.textLoginInicial}>Entrar</Text>
          </View>

          <TextInput 
            onChangeText={(text) => this.setState({inputEmail: text})}
            blurOnSubmit={false} 
            onSubmitEditing={() => { this.senha.focus(); }} 
            style={estilos.textLoginInput} 
            keyboardType='email-address' 
            placeholder='Email...' 
            textContentType='none'>
          </TextInput>

          <TextInput 
            onChangeText={(text) => this.setState({inputSenha: text})}
            ref={(input) => { this.senha = input; }} 
            style={estilos.textLoginInput} secureTextEntry={true} 
            placeholder='Senha...' 
            textContentType='password'>
          </TextInput>

          <TouchableOpacity onPress={this.entrarApp} style={estilos.buttonLogin}>
            <Text style={estilos.buttonLoginTexto} >Entrar</Text>
          </TouchableOpacity>

          <View style={estilos.buttonCadastro}>
            <Text style={estilos.textLoginCadastro}>Não possui conta?</Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Cadastro')}>
              <Text style={estilos.textLoginCadastroEvento}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={estilos.textLoginOpcaoCadastro}>Ou entre com</Text>

          <View style={{alignItems: 'center', justifyContent: 'center'}}>
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