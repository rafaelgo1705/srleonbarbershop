import React from 'react';
import {View, BackHandler, FlatList, Text, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

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

    this.state = {
      arrayCabeleireiros: [],
    }

    this.state = {
      verModalCortes:false,
      arrayCortes: [],
      id:'',
      titulo: '',
      texto:'',
      preco: '',
    }

    this.state = {
      arrayCortesCabeleireiro: [],
      arrayCortesCabeleireiroTemp: [],
    }

  }

  componentDidMount() {
    this.carregarListaCabeleireiros();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Menu');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  abrirCadastroCabeleireiro = () => {
    this.setState({arrayCortesCabeleireiro:[]})
    this.setState({arrayCortesCabeleireiroTemp:[]})

    this.exibirOcultarModal();
  }

  exibirOcultarModal = () => {
    this.setState({ verModal: !this.state.verModal });
    
  };

  salvarCabeleireiro = () => {
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.push().set({
      nome: this.state.inputNome,
      avaliacao: "Sem avaliação",
      cortes: this.state.arrayCortesCabeleireiroTemp
      
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

  abrirEdicaoCabeleireiro = (item) =>{
    this.setState({arrayCortesCabeleireiroTemp:[]})
    this.setState({arrayCortesCabeleireiro:[]})
    this.carregarCortesAssociados(item.id);

    this.exibirOcultarModalEditar(item);
  }

  exibirOcultarModalEditar = (item) => {
    this.setState({nomeCabeleireiro: item.nome})
    this.setState({inputNomeCabeleireiro:item.nome})
    this.setState({idCabeleireiro: item.id})
    this.setState({ verModalEditar: !this.state.verModalEditar });
  }

  editarCabeleireiro = () => {
    var ref = database().ref("/leonbarbershop/cabeleireiros/"+this.state.idCabeleireiro);

    ref.set({
      nome: this.state.inputNomeCabeleireiro,
      cortes: this.state.arrayCortesCabeleireiroTemp,
      avaliacao: "Sem avaliação"
    }).then(() => {
      Alert.alert("Sucesso", "Os dados foram alterados!")
      this.carregarCortesAssociados(this.state.idCabeleireiro);
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

  abrirSelecaoCortes = () => {
    this.setState({arrayCortes:[]});
    this.carregarListaCortes();
    this.exibirOcultarModalCortes();
  }

  exibirOcultarModalCortes = () => {
    this.setState({ verModalCortes: !this.state.verModalCortes });
  }

  carregarListaCortes() {
    var ref = database().ref("/leonbarbershop/cortes");

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

  adicionarCorte = (item) => {
    Alert.alert("Mensagem", "Deseja adicionar o corte "+item.titulo+ " ?",
      [
        {
            text: 'Não', onPress: () => 
            console.log('Não pressed')
        },
        {
            text: 'Sim', onPress: () => {
            this.setState({
              arrayCortesCabeleireiroTemp:
              [...this.state.arrayCortesCabeleireiroTemp, ...[
                  {
                    idCorte:item.id,
                  }
              ]]
            })

            this.setState({
              arrayCortesCabeleireiro:
              [...this.state.arrayCortesCabeleireiro, ...[
                  {
                    idCorte:item.id,
                    titulo: item.titulo,
                    texto: item.texto,
                    preco: item.preco
                  }
              ]]
            })
          }
        }
    ]);
    
  }

  carregarCortesAssociados = (idCabeleireiro) => {
    this.setState({arrayCortesCabeleireiro:[]})
    this.setState({arrayCortesCabeleireiroTemp:[]})
    var ref = database().ref("/leonbarbershop/cabeleireiros/"+idCabeleireiro+"/cortes/")

    ref.orderByChild("idCorte").on("child_added", (snapshot) => {
      this.carregarInformacoesCorte(snapshot.child("idCorte").val())
    })
  }

  carregarInformacoesCorte = (idCorte) => {
    var ref = database().ref("/leonbarbershop/cortes/"+idCorte)

    ref.orderByChild(idCorte).on("value", (snapshot) => {
      this.setState({
        arrayCortesCabeleireiroTemp:
        [...this.state.arrayCortesCabeleireiroTemp, ...[
            {
              idCorte:snapshot.key,
            }
        ]]
      })

      this.setState({
        arrayCortesCabeleireiro:
        [...this.state.arrayCortesCabeleireiro, ...[
            {
              idCorte:snapshot.key,
              titulo:snapshot.child("titulo").val(),
              texto:snapshot.child("texto").val(),
              preco:snapshot.child("preco").val()
            }
        ]]
      })
    })
  }

  excluirCorteCabeleireiro = (item) => {
    var cortes = this.state.arrayCortesCabeleireiro;
    var remover = item;
    var index = cortes.indexOf(remover);

    var cortes2 = this.state.arrayCortesCabeleireiroTemp;
    var remover2 = item;
    var index2 = cortes2.indexOf(remover2);

    if (index > -1) {
      cortes.splice(index, 1);
      cortes2.splice(index2, 1)
      this.setState({arrayCortesCabeleireiro:cortes})
      this.setState({arrayCortesCabeleireiroTemp:cortes2})
    }
  }

  render() {
    return (
        <View style={estilos.viewTabs}>
          <View style={estilos.viewSuperiorStatus}>
            <Text style={estilos.textLoginInicial}>Cabeleireiros</Text>
          </View>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                      <TouchableOpacity onPress={() => this.abrirEdicaoCabeleireiro(item)}>
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
          </ScrollView>
            <Modal isVisible={this.state.verModal} onRequestClose={this.exibirOcultarModal}>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
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

                <FlatList
                  data={this.state.arrayCortesCabeleireiro}
                  renderItem={({ item }) => {
                    return (
                      <View style={[estilos.itemArray, { backgroundColor: colors.corBranca }]}>
                        <View style={{flexDirection:'column'}}>
                          <Text style={estilos.title}>{item.titulo}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection:"column", alignItems:"flex-end", justifyContent: "center", marginRight: 0}}>
                          <View style={{flexDirection:"row"}}>
                            
                            <TouchableOpacity onPress={() => this.excluirCorteCabeleireiro(item)}>
                              <Image source={require('../../imagens/icons/icon_delete.png')} style={{justifyContent: 'center', alignContent: 'center', marginBottom: 0, padding: 0, height:35, width:35}}/>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) 
                  }}
                  keyExtractor={item => item.id}
                />

                <TouchableOpacity onPress={this.abrirSelecaoCortes}>
                  <Text style={estilos.textHorarioAtendimento}>Adicionar cortes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.buttonCadastoCabeleireiro} onPress={this.salvarCabeleireiro} >
                  <Text style={estilos.textLoginCadastro}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilos.buttonExcluirConta} onPress={this.exibirOcultarModal} >
                  <Text style={estilos.textLoginCadastro}>Cancelar</Text>
                </TouchableOpacity>
                
              </View>
              </ScrollView>
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

                  <FlatList
                    data={this.state.arrayCortesCabeleireiro}
                    renderItem={({ item }) => {
                      return (
                        <View style={[estilos.itemArray, { backgroundColor: colors.corBranca }]}>
                          <View style={{flexDirection:'column'}}>
                            <Text style={estilos.title}>{item.titulo}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection:"column", alignItems:"flex-end", justifyContent: "center", marginRight: 0}}>
                            <View style={{flexDirection:"row"}}>
                              
                              <TouchableOpacity onPress={() => this.excluirCorteCabeleireiro(item)}>
                                <Image source={require('../../imagens/icons/icon_delete.png')} style={{justifyContent: 'center', alignContent: 'center', marginBottom: 0, padding: 0, height:35, width:35}}/>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ) 
                    }}
                    keyExtractor={item => item.id}
                  />
                  <TouchableOpacity onPress={this.abrirSelecaoCortes}>
                    <Text style={estilos.textHorarioAtendimento}>Adicionar cortes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={estilos.buttonCadastoCabeleireiro} onPress={this.editarCabeleireiro}>
                    <Text style={estilos.textLoginCadastro}>Alterar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={estilos.buttonExcluirConta} onPress={this.exibirOcultarModalEditar} >
                    <Text style={estilos.textLoginCadastro}>Cancelar</Text>
                  </TouchableOpacity>      
              </View>
            </Modal>

            <Modal isVisible={this.state.verModalCortes} onRequestClose={this.exibirOcultarModalCortes}>
              <View style={{ flex: 1, justifyContent:"center"}}>
                <ScrollView>
                  <View >
                    <FlatList
                      data={this.state.arrayCortes}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity
                            onPress={() => this.adicionarCorte(item)}
                            style={[
                              estilos.itemArray,
                              { backgroundColor: colors.corBranca},
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
                      keyExtractor={item => item.id}
                    />
                  </View>     
                  </ScrollView>             
                  
                  <TouchableOpacity style={estilos.buttonExcluirConta} onPress={this.exibirOcultarModalCortes} >
                    <Text style={estilos.textLoginCadastro}>Voltar</Text>
                  </TouchableOpacity>      
                
              </View>
            </Modal>

          <ActionButton buttonColor={colors.corButtonLogin} onPress={this.exibirOcultarModal}/>

          <ActionButton renderIcon={() => (<Ionicons color={colors.corBranca} name="md-arrow-back" size={25}/> )} position="left" buttonColor={colors.corVermelhaApp} onPress={() => this.props.navigation.navigate("Menu")}/>            
        </View>
    );
  }
}