import React, {Component} from 'react';
import {View, Text, Alert, Image, TouchableOpacity, ScrollView} from 'react-native';
import estilos from '../../styles/estilos';

import auth from '@react-native-firebase/auth';

import ContaController from '../../controller/tabs/ContaController';

export default class Conta extends React.Component {
  constructor(props) {
    super(props);
    this.contaController = new ContaController();

    this.userProfile = auth().currentUser;

    this.state = {
      nome: this.userProfile.displayName,
      email: this.userProfile.email,
      telefone: "+5564984792087",
      
    };
  }

  editarConta = () => {
    this.contaController.editarConta(this.props);
  }

  cartaoFidelidade = () => {
    Alert.alert("Em desenvolvimento");
  }

  historicoCortes = () => {
    Alert.alert("Em desenvolvimento");
  }

  verAgendamentos = () => {
    Alert.alert("Em desenvolvimento");
  }

  mudarSenha = () => {
    this.contaController.redefinirSenha(this.props);
  }

  sair = () => {
    this.contaController.sairApp();
  }

  painelAdministrativo = () => {
    this.contaController.painelAdministrador(this.props);
  }

  excluirConta = () => {
    Alert.alert("Ainda não exclui!");
  }

  componentWillUnmount(){
    this.userProfile = null;
  }

    render() {
      return (
        <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
          <View style={estilos.viewContaTab}>
            <View style={estilos.dadosContaSuperior}>
              <View style={estilos.dadosContaSuperiorLinha}>
                <Image source={require('../../imagens/user.png')} style={{justifyContent: 'center', alignItems: 'center', marginBottom: 0, padding: 0, height:100, width:100}}></Image>
                
                <View style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Text style={{maginLeft: 10}, estilos.textoNegritoConta}>{this.state.nome}</Text>
                  <Text style={{maginLeft: 10}, estilos.textoNormalConta}>{this.state.email}</Text>
                  <Text style={{maginLeft: 10}, estilos.textoNormalConta}>{this.state.telefone}</Text>
                </View>
              </View>

            <TouchableOpacity style={estilos.viewEditarConta} onPress={this.editarConta}><Text style={estilos.textoNormalEditarConta}> Editar conta</Text>
              <Image source={require('../../imagens/icons/icon_edit.png')} style={{justifyContent: 'center', alignItems: 'center', marginLeft: 5, height:18, width:18}}></Image>
            </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <View>
                <TouchableOpacity onPress={this.cartaoFidelidade}><Text style={estilos.opcoesContaTab1}> Cartão fidelidade</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.historicoCortes}><Text style={estilos.opcoesContaTab}> Histórico de cortes</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.verAgendamentos}><Text style={estilos.opcoesContaTab}> Ver agendamentos</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.mudarSenha}><Text style={estilos.opcoesContaTab}> Redefinir senha</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.sair}><Text style={estilos.sairContaTab}> Sair do App</Text></TouchableOpacity>
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end', marginHorizontal: 20}}>
                <TouchableOpacity onPress={this.painelAdministrativo} style={estilos.buttonPainelConta}>
                  <Text style={estilos.buttonExcluirContaTexto} >Painel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.excluirConta} style={estilos.buttonExcluirConta}>
                  <Text style={estilos.buttonExcluirContaTexto} >Excluir conta</Text>
                </TouchableOpacity>  
              </View>
            </View>     
          </View>
        </ScrollView>
      );
    }
  }