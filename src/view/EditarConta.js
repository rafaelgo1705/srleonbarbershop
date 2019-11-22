import React from 'react';
import {View, Text, BackHandler, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';

import auth from '@react-native-firebase/auth';

import estilos from '../styles/estilos';

import EditarContaController from '../controller/EditarContaController';

import database from '@react-native-firebase/database';

import Base64 from '../base64/Base64';

export default class EditarConta extends React.Component {
  constructor(props){
    super(props);

    this.userProfile = auth().currentUser;

    this.state = {
      nome : this.userProfile.displayName,
      email : this.userProfile.email,
      perfil: "",
      telefone: "",
    }

    var ref = database().ref("/leonbarbershop/usuarios/"+new Base64().codificarBase64(this.userProfile.email));

    ref.on("value", (snapshot) => {
      this.setState({perfil:snapshot.child("perfil").val()})
      this.setState({telefone:snapshot.child("telefone").val()})
    });

    this.editarContaController = new EditarContaController();
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

  alterarDados = () => {
    this.editarContaController.alterarDadosConta();
  }

  cancelar = () => {
    this.props.navigation.navigate('Conta');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewPrincipalEditarConta}>
          <View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginVertical: 20}}>
            <Image source={require('../imagens/user.png')} style={{height:100, width:100}}></Image>
          </View>
            <TextInput
                onChangeText={(text) => this.setState({inputNome: text})}
                blurOnSubmit={false} 
                onSubmitEditing={() => { this.telefone.focus(); }}
                style={estilos.textLoginInput} 
                keyboardType='name-phone-pad' 
                placeholder='Nome...' 
                textContentType='name'>{this.state.nome}
            </TextInput>

            <TextInput
                onChangeText={(text) => this.setState({inputEmail: text})}
                blurOnSubmit={false} 
                ref={(input) => { this.email = input; }}
                onSubmitEditing={() => { this.telefone.focus(); }}
                style={estilos.textLoginInput} 
                keyboardType='email-address' 
                placeholder='Email...' 
                editable={false}
                textContentType='emailAddress'>{this.state.email}
            </TextInput>

            <TextInput
                onChangeText={(text) => this.setState({inputTelefone: text})}
                blurOnSubmit={false} 
                ref={(input) => { this.telefone = input; }}
                style={estilos.textLoginInput} 
                keyboardType='phone-pad' 
                placeholder='Telefone...' 
                textContentType='telephoneNumber'>{this.state.telefone}
            </TextInput>
            
            <TouchableOpacity onPress={this.alterarDados} style={estilos.buttonRedefinirSenhaAlterar}>
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