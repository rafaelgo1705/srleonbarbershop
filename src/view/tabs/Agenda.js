import React from 'react';
import {View, Image, Text, TextInput, FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import AgendaController from '../../controller/tabs/AgendaController';

import database from '@react-native-firebase/database';

import { CheckBox } from 'react-native-elements'
import {Calendar} from 'react-native-calendars';

import auth from '@react-native-firebase/auth';

import Base64 from '../../base64/Base64';

export default class Agenda extends React.Component {
  constructor(props){
    super(props);

    this.state = {text: "", inputNome: ""}

    this.agendaController = new AgendaController();

    this.state = {
      verTela: 0,
      corte: [],
      cabeleireiro: [],
      data: '',
      horario: '',

      //Listar cabeleireiros
      statusCabeleireiro: false,
      arrayCabeleireiros: [],
      nome: '',
      avaliacao: '',

      //Listrar Cortes
      statusCorte: true,
      arrayCortes: [],
      id:'',
      titulo: '',
      texto:'',
      preco: '',

      //Listar Horarios
      arrayHorarios:[
        {
          id:"9",
          hora:"09",
          minuto:"00"
        },
        {
          id:"10",
          hora:"10",
          minuto:"00"
        },
        {
          id:"11",
          hora:"11",
          minuto:"00"
        },
        {
          id:"12",
          hora:"12",
          minuto:"00"
        },
        {
          id:"13",
          hora:"13",
          minuto:"00"
        },
        {
          id:"14",
          hora:"14",
          minuto:"00"
        },
        {
          id:"15",
          hora:"15",
          minuto:"00"
        },
        {
          id:"16",
          hora:"16",
          minuto:"00"
        },
        {
          id:"17",
          hora:"17",
          minuto:"00"
        },
        {
          id:"18",
          hora:"18",
          minuto:"00"
        },
        {
          id:"19",
          hora:"19",
          minuto:"00"
        },
        {
          id:"20",
          hora:"20",
          minuto:"00"
        },
        {
          id:"21",
          hora:"21",
          minuto:"00"
        },
        {
          id:"22",
          hora:"22",
          minuto:"00"
        },
      ],

      //ArrayAgenda
      //Informações Corte
      idCorteAgenda: '',
      nomeCorte: '',
      tipoCorte: '',
      precoCorte: '',

      //Informações Cabeleireiro
      idCabeleireiroAgenda: '',
      nomeCabeleireiro: '',

      //Informações do dia
      dia: '',
      mes: '',
      ano: '',
      hora: '',
      minuto: '',

      paramim: false,
      paraoutro: false,

      //Informações do usuário
      idUsuario: '',
      perfilUsuario: '',
      telefoneUsuario: '',
      nomeUsuario: '',
      inputTelefone: '',
      inputNome: '',
    }
  }

  componentDidMount(){
    this.carregarListaCortes();
    this.carregarUsuario();
  }

  carregarUsuario = () => {
    const nomeUsuario = auth().currentUser.displayName;
    const emailCliente = new Base64().codificarBase64(auth().currentUser.email) 

    this.setState({
      idUsuario: '',
      perfilUsuario: '',
      telefoneUsuario: '',
      nomeUsuario: '',
    })

    var ref = database().ref(`/leonbarbershop/usuarios/${emailCliente}`);

    ref.on("value", (snapshot) => {
      this.setState({
        idUsuario: emailCliente,
        perfilUsuario: snapshot.child("perfil").val(),
        telefoneUsuario: snapshot.child("telefone").val(),
        nomeUsuario: nomeUsuario,
      })
    })
  }

  mudarTela = (verTela) => {
    if(verTela == 0){
      this.carregarListaCortes();
      this.setState({verTela:0})

    }else if(verTela == 1){
      this.carregarListaCabeleireiros(this.state.idCorteAgenda);
      this.setState({verTela:1})

    }else if(verTela == 2){
      this.setState({verTela:2})

    }else if(verTela == 3){
      this.setState({verTela:3})

    }else if(verTela == 4){
      this.setState({verTela:4})

    }else if(verTela == 5){
      this.setState({verTela:5})

    }else{
      return null;
    }
  }

  _onPressCorte = (item) => {
    this.setState({
      idCorteAgenda:'',
      nomeCorte:'',
      precoCorte:'',
      tipoCorte:''
    })

    this.setState({
      idCorteAgenda:item.idCorte,
      nomeCorte:item.titulo,
      precoCorte:item.preco,
      tipoCorte:item.texto
    }, () => {this.mudarTela(1)})
  }

  _onPressCabeleireiro = (item) => {
    this.setState({
      idCabeleireiroAgenda:'',
      nomeCabeleireiro:''
    })
    
    this.setState({
      idCabeleireiroAgenda:item.id,
      nomeCabeleireiro:item.nome
    }, () => {this.mudarTela(2)})
  }

  _onPressData = (date) => {
    this.setState({
      dia:'',
      mes:'',
      ano:'',
    })

    this.setState({
      dia:date.day,
      mes:date.month,
      ano:date.year,
    }, () => {this.mudarTela(3)})
  }

  _onPressHorario = (item) => {
    if(this.state.perfilUsuario === "normal"){
      this.setState({
        hora:'',
        minuto:'',
      })

      this.setState({
        hora:item.hora,
        minuto:item.minuto,
      
      }, () => {this.mudarTela(4)})
    
    }else if(this.state.perfilUsuario === "administrador"){
      this.setState({
        hora:'',
        minuto:'',
      })

      this.setState({
        hora:item.hora,
        minuto:item.minuto,
      
      }, () => {this.mudarTela(5)})
    }
  }

  _onPressAgendaAdmin = () => {
    if(this.state.paramim){
      this.mudarTela(4)

    }else if(this.state.paraoutro){
      if(this.state.inputNome === "" || this.state.inputTelefone === ""){
        Alert.alert("Erro", "Preencha todos os campos!")

      }else{
        this.mudarTela(4)
      }

    }else{
      Alert.alert("Selecionar", "Marque uma opção!")
    }
  }

  _onPressVoltarResumo = () => {
    if(this.state.perfilUsuario === "administrador"){
      this.setState({verTela:5})
      this.setState({
        paramim: false,
        paraoutro: false,
        inputNome: "",
        inputTelefone: "",
      })
    
    }else if(this.state.perfilUsuario === "normal"){
      this.setState({verTela:3})
    }
  }

  telaCortes(){
    return(
      <View>
            <Text style={estilos.textoNegritoAgenda}>Selecione o corte</Text>
            <FlatList
              data={this.state.arrayCortes}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={
                      () => this._onPressCorte(item)
                    }
                    style={[
                      estilos.itemArray,
                      { backgroundColor: colors.corBranca },
                    ]}>
                    <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                    <View style={{flexDirection:'column'}}>
                      <Text style={estilos.title}>{item.titulo}</Text>
                      <Text style={estilos.textoNormalProduto}>{item.texto}</Text>
                    </View>
                    <View style={estilos.estiloPreco}>
                      <Text style={estilos.textoPreco}>{"R$ " + item.preco + ",00"}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={item => item.idCorte}
            />
          </View>
    );
  }

  telaCabeleireiros = () => {
    return (
      <View >
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.mudarTela(0)}>
            <Image style={{width: 30, height: 30, marginLeft: 5}} source={require('../../imagens/icons/icon_voltar_seta_black.png')}></Image>
          </TouchableOpacity>
          <Text style={estilos.textoNegritoAgenda}>Selecione o cabeleireiro</Text>
        </View>
        
        <FlatList
          data={this.state.arrayCabeleireiros}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => this._onPressCabeleireiro(item)}
                style={[
                  estilos.itemArray,
                  { backgroundColor: colors.corBranca },
                ]}
              >
                <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
                <View style={{flexDirection:'column'}}>
                  <Text style={estilos.title}>{item.nome}</Text>
                  <Text style={estilos.textoNormalProduto}>{item.avaliacao}</Text>
                </View>
              </TouchableOpacity>
            ) 
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }

  telaData = () => {
    return (
      <View >
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.mudarTela(1)}>
            <Image style={{width: 30, height: 30, marginLeft: 5}} source={require('../../imagens/icons/icon_voltar_seta_black.png')}></Image>
          </TouchableOpacity>
          <Text style={estilos.textoNegritoAgenda}>Selecione a data</Text>
        </View>
        <Calendar
          onDayPress={(date) => {
            this._onPressData(date)
          }}
        />
      </View>
    );
  }

  telaHorario = () => {
    return (
      <View >
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.mudarTela(2)}>
            <Image style={{width: 30, height: 30, marginLeft: 5}} source={require('../../imagens/icons/icon_voltar_seta_black.png')}></Image>
          </TouchableOpacity>
          <Text style={estilos.textoNegritoAgenda}>Selecione a hora</Text>
        </View>
          <FlatList
            data={this.state.arrayHorarios}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => this._onPressHorario(item)}
                  style={[
                    estilos.itemArray,
                    { backgroundColor: colors.corBranca },
                  ]}
                >
                  <Text style={estilos.title}>{item.hora + ":" + item.minuto}</Text>
                </TouchableOpacity>
              ) 
            }}
            keyExtractor={item => item.id}
          />
      </View>
    );
  }

  telaResumo = () => {
    return (
      <View >
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this._onPressVoltarResumo()}>
            <Image style={{width: 30, height: 30, marginLeft: 5}} source={require('../../imagens/icons/icon_voltar_seta_black.png')}></Image>
          </TouchableOpacity>
          <Text style={estilos.textoNegritoAgenda}>Resumo</Text>
        </View>
        <View>
          <Text style={estilos.textoResumoAgendaPrincipal}>Corte:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.nomeCorte}</Text>
          <Text style={estilos.textoResumoAgendaPrincipal}>Cabeleireiro:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.nomeCabeleireiro}</Text>
          <Text style={estilos.textoResumoAgendaPrincipal}>Data:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.dia + "/" +this.state.mes + "/" + this.state.ano}</Text>
          <Text style={estilos.textoResumoAgendaPrincipal}>Horario:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.hora + ":" + this.state.minuto}</Text>

          {this.validarCliente()}
        </View>
      </View>
    );
  }

  validarCliente = () => {
    if(this.state.paraoutro){
      return(
        <View>
          <Text style={estilos.textoResumoAgendaPrincipal}>Cliente:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.inputNome + " | " + this.state.inputTelefone}</Text>
        </View>
      );
    }else if(this.state.paramim){
      return(
        <View>
          <Text style={estilos.textoResumoAgendaPrincipal}>Cliente:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.nomeUsuario + " | " + this.state.telefoneUsuario}</Text>
        </View>
      );
    }else{
      return(
        <View>
          <Text style={estilos.textoResumoAgendaPrincipal}>Cliente:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.nomeUsuario + " | " + this.state.telefoneUsuario}</Text>
        </View>
      );
    }
  }

  telaResumoButton = () => {
    return(
      <View style={{ justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.confirmarAgendamento()} style={estilos.buttonAgendar}>
              <Text style={estilos.textoNegritoConta}>{"Agendar (R$ " + this.state.precoCorte + ",00)"}</Text>
          </TouchableOpacity>
        </View>
    );
  }

  telaUsuarioAdmin = () => {
    return (
      <View >
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.mudarTela(3)}>
            <Image style={{width: 30, height: 30, marginLeft: 5}} source={require('../../imagens/icons/icon_voltar_seta_black.png')}></Image>
          </TouchableOpacity>
          <Text style={estilos.textoNegritoAgenda}>Para quem é o corte?</Text>
        </View>
        <View>
          <CheckBox
            center
            onPress={() => this.setState({paraoutro:false, paramim:true})}
            title='Para mim'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.paramim}
          />
          <CheckBox
            center
            onPress={() => this.setState({paraoutro:true, paramim:false})}
            title='Cliente'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            checked={this.state.paraoutro}
          />
          <View style={{alignContent: 'center'}}>
            {this.state.paraoutro == true ? this.carregarTelaCliente() : null}
          </View>
        </View>

        <TouchableOpacity onPress={() => this._onPressAgendaAdmin()} style={estilos.buttonAgendaAdmin}>
          <Text style={estilos.textoNegritoConta}>{"Avançar"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  carregarTelaCliente = () => {
    return (
      <View style={{alignContent: 'center', paddingHorizontal: 10}}>
        <Text style={estilos.textoAgendaCliente}>Informações do cliente: </Text>

        <TextInput 
            onChangeText={(text) => this.setState({inputNome: text})}
            style={estilos.inputTextTelaAgenda} 
            blurOnSubmit={true}
            keyboardType='name-phone-pad' 
            placeholder='Nome...' 
            textContentType='none'>
          </TextInput>
          <TextInput 
            onChangeText={(text) => this.setState({inputTelefone: text})}
            style={estilos.inputTextTelaAgenda} 
            keyboardType='number-pad' 
            placeholder='Telefone...' 
            textContentType='none'>
          </TextInput>
      </View>
    );
  }

  confirmarAgendamento = () => {
    if(this.state.paramim){
      this.agendaController.salvarAgendamento(
        this, 
        this.state.idCorteAgenda,
        this.state.nomeCorte,
        this.state.precoCorte,
        this.state.idCabeleireiroAgenda,
        this.state.nomeCabeleireiro,
        this.state.dia,
        this.state.mes,
        this.state.ano,
        this.state.hora,
        this.state.minuto,
        this.state.nomeUsuario,
        this.state.idUsuario,
        "",
      );
    }else if(this.state.paraoutro){
      this.agendaController.salvarAgendamento(
        this, 
        this.state.idCorteAgenda,
        this.state.nomeCorte,
        this.state.precoCorte,
        this.state.idCabeleireiroAgenda,
        this.state.nomeCabeleireiro,
        this.state.dia,
        this.state.mes,
        this.state.ano,
        this.state.hora,
        this.state.minuto,
        this.state.inputNome,
        this.state.idUsuario,
        this.state.inputTelefone
      );
    }else{
      this.agendaController.salvarAgendamento(
        this, 
        this.state.idCorteAgenda,
        this.state.nomeCorte,
        this.state.precoCorte,
        this.state.idCabeleireiroAgenda,
        this.state.nomeCabeleireiro,
        this.state.dia,
        this.state.mes,
        this.state.ano,
        this.state.hora,
        this.state.minuto,
        this.state.nomeUsuario,
        this.state.idUsuario,
        "",
      );
    }
    
  }

  carregarListaCortes() {
    this.setState({arrayCortes:[]})
    var ref = database().ref("/leonbarbershop/cortes");

    ref.orderByChild("titulo").on("child_added", (snapshot) => {
      this.setState({ 
        arrayCortes : 
          [...this.state.arrayCortes, ...[
            {   
              idCorte:snapshot.key,
              titulo:snapshot.child("titulo").val(),
              preco:snapshot.child("preco").val(),
              texto:snapshot.child("texto").val()
            }
        ]] 
        })
        
    })
  }

  carregarListaCabeleireiros(idCorte) {
    this.setState({arrayCabeleireiros:[]})
    var ref = database().ref("/leonbarbershop/cabeleireiros");

    ref.orderByChild("nome").on("child_added", (snapshot) => {
      ref.child(snapshot.key).child("cortes").orderByChild("idCorte").equalTo(idCorte).on("child_added", (snap) => {
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
    })
  }

  limparCampos = () => {
    this.setState({
      verTela: 0,
      corte: [],
      cabeleireiro: [],
      data: '',
      horario: '',

      //Listar cabeleireiros
      statusCabeleireiro: false,
      arrayCabeleireiros: [],
      nome: '',
      avaliacao: '',

      //Listrar Cortes
      statusCorte: true,
      arrayCortes: [],
      id:'',
      titulo: '',
      texto:'',
      preco: '',

      //ArrayAgenda
      //Informações Corte
      idCorteAgenda: '',
      nomeCorte: '',
      tipoCorte: '',
      precoCorte: '',

      //Informações Cabeleireiro
      idCabeleireiroAgenda: '',
      nomeCabeleireiro: '',

      //Informações do dia
      dia: '',
      mes: '',
      ano: '',
      hora: '',
      minuto: '',

      inputNome: '',
      inputTelefone: '',

      paraoutro: false,
      paramim: false,
    })

    this.carregarListaCortes()
  }
  
    render() {
      return (
        <View style={estilos.viewAgenda}>
          <ScrollView contentContainerStyle={estilos.scrollViewTabAgenda}>
            <View style={estilos.viewSuperiorAgenda}>
              <Image source={require('../../imagens/logo.png')} style={{marginTop: -10, marginBottom: -20, padding: 0, height:170, width:170}}></Image>
              <Text style={estilos.textoTitulo}>Sr. León Barber Shop</Text>
            </View>
            <View>
              {this.state.verTela == 0 ? this.telaCortes() : null}
              {this.state.verTela == 1 ? this.telaCabeleireiros() : null}
              {this.state.verTela == 2 ? this.telaData() : null}
              {this.state.verTela == 3 ? this.telaHorario() : null}
              
              {this.state.verTela == 4 ? this.telaResumo() : null}

              {this.state.verTela == 5 ? this.telaUsuarioAdmin() : null}
              
            </View>
          </ScrollView>
          {this.state.verTela == 4 ? this.telaResumoButton() : null}
      </View>
      );
    }
  }