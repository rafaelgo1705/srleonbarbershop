import React from 'react';
import {View, BackHandler, FlatList, Text, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
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
      verModal: false,

      nomeCabeleireiro: "",
      inputNomeCabeleireiro: "",
      idCabeleireiro: "",
      verModalEditar: false,
    };

    this.state = ({
      arrayCabeleireiros: [],
    })
    
  }

  componentDidMount() {
    this.carregarListaCabeleireiros();
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

  salvarCabeleireiro = () => {
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.push().set({
      nome: this.state.inputNome,
      avaliacao: "Sem avaliação"
    }).then(() => {
      Alert.alert("Sucesso", "O cabeleireiro foi cadastrado!",
      [
        {text: 'Ok', onPress: this.exibirOcultarModal}
      ])
      
    }).catch(function(){
      Alert.alert("Erro", "Não foi possível cadastrar o cabeleireiro!")
    });
  }

  carregarListaCabeleireiros = () => {
    var ref = database().ref("/leonbarbershop/cabeleireiros");
    this.state.arrayCabeleireiros = []

    ref.orderByChild("nome").on("child_added", (snapshot) => {
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
  }

  exibirOcultarModalEditar = (item) => {
    this.setState({nomeCabeleireiro: item.nome})
    this.setState({idCabeleireiro: item.id})
    this.setState({ verModalEditar: !this.state.verModalEditar });
  }

  editarCabeleireiro = () => {
    var ref = database().ref("/leonbarbershop/cabeleireiros/"+this.state.idCabeleireiro);

    ref.set({
      nome: this.state.inputNomeCabeleireiro
    })
  }

  excluirCabeleireiro = (item) => {
    var ref = database().ref("/leonbarbershop/cabeleireiros/"+item.id);
    Alert.alert("Apagar", "Deseja apagar o cabeleireiro " + item.nome + "?",
        [
            {
                text: 'Não', onPress: () => 
                console.log('Não pressed')
            },
            {
                text: 'Sim', onPress: () => 
                  ref.remove().then(() => {
                    Alert.alert("Sucesso", "O cabeleireiro " +item.nome+ " foi apagado!")
                    this.carregarListaCabeleireiros();

                  }).catch((error) => {
                    Alert.alert("Erro", "Não foi possível deletar "+item.nome)
                  })
            }
        ]);
  }

  render() {
    return (
        <View style={estilos.viewTabs}>
          <FlatList
            data={this.state.arrayCabeleireiros}
            renderItem={({ item }) => {
              return (
                <View style={[estilos.itemArray, { backgroundColor: colors.corBranca }]}>
                  <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                  <View style={{flexDirection:'column'}}>
                    <Text style={estilos.title}>{item.nome}</Text>
                    <Text style={estilos.textoNormalProduto}>{item.avaliacao}</Text>
                  </View>
                  <View style={{flex: 1, flexDirection:"column", alignItems:"flex-end", justifyContent: "center", marginRight: 0}}>
                    <View style={{flexDirection:"row"}}>
                      <TouchableOpacity onPress={() => this.exibirOcultarModalEditar(item)}>
                        <Image source={require('../../imagens/icons/icon_edit_black.png')} style={{justifyContent: 'center', alignContent: 'center', marginRight: 10, height:30, width:30}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.excluirCabeleireiro(item)}>
                        <Image source={require('../../imagens/icons/icon_delete.png')} style={{justifyContent: 'center', alignContent: 'center', marginBottom: 0, padding: 0, height:35, width:35}}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) 
            }}
            keyExtractor={item => item.id}
          />
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

            <Modal isVisible={this.state.verModalEditar} onRequestClose={this.exibirOcultarModalEditar}>
              <View style={{ flex: 1, justifyContent:"center"}}>
                <Text style={estilos.textLoginInicial}>{this.state.nomeCabeleireiro}</Text>
                  <TextInput
                    onChangeText={(text) => this.setState({inputNomeCabeleireiro: text})}
                    blurOnSubmit={false} 
                    style={estilos.textLoginInput} 
                    keyboardType='name-phone-pad' 
                    placeholder='Nome...' 
                    textContentType='name'>{this.state.nomeCabeleireiro}
                  </TextInput>
                  <TouchableOpacity style={estilos.buttonCadastoCabeleireiro} onPress={this.editarCabeleireiro}>
                    <Text style={estilos.textLoginCadastro}>Alterar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={estilos.buttonExcluirConta} onPress={this.exibirOcultarModalEditar} >
                    <Text style={estilos.textLoginCadastro}>Cancelar</Text>
                  </TouchableOpacity>      
              </View>
            </Modal>

          <ActionButton buttonColor={colors.corButtonLogin} onPress={this.exibirOcultarModal}/>

          <ActionButton position="left" buttonColor={colors.corButtonLogin} onPress={() => this.props.navigation.navigate("Cadastramento")}/>            
        </View>
    );
  }
}