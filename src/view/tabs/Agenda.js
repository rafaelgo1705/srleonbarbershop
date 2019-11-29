import React from 'react';
import {View, Image, Text, TextInput, FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import AgendaController from '../../controller/tabs/AgendaController';

import { CheckBox } from 'react-native-elements';
import TimePicker from "react-native-24h-timepicker";

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Base64 from '../../base64/Base64';

console.disableYellowBox = true;

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
      arrayHoras:[],

      //ArrayAgenda
      //Informações Corte
      idCorteAgenda: '',
      nomeCorte: '',
      tempoCorte: '',
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
      horaInicio: '',
      minutoInicio: '',
      horaTermino: '',
      minutoTermino: '',

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

  compararNumeros = (a, b) => {
    return a - b;
  }

  diaDaSemana(date) {
    var semana = new Array(7);
    semana[0] = 1;
    semana[1] = 2;
    semana[2] = 3;
    semana[3] = 4;
    semana[4] = 5;
    semana[5] = 6;
    semana[6] = 7;
    
    return semana[date];
  }

  carregarHorarioDia = (dayOfWeek) => {
    this.setState({
      horaInicio: "",
      minutoInicio: "",
      horaFim: "",
      minutoFim: "",
    }, () => {
      var diaDaSemana = this.diaDaSemana(dayOfWeek);

      var ref = database().ref(`/leonbarbershop/painel/horarioAtendimento/${diaDaSemana}`)

      ref.on("child_added", (snapshot) => {
        var horaInicio = snapshot.child("horaInicio").val()
        var minutoInicio = snapshot.child("minutoInicio").val()
        var horaTermino = snapshot.child("horaTermino").val()
        var minutoTermino = snapshot.child("minutoTermino").val()

        if((!horaInicio == null || !horaInicio == "") && (!minutoInicio == null || !minutoInicio == "")){
          this.setState({
            horaInicio:horaInicio,
            minutoInicio:minutoInicio,
          })
        }

        if((!horaTermino == null || !horaTermino == "") && (!minutoTermino == null || !minutoTermino == "")){
          this.setState({
            horaTermino:horaTermino,
            minutoTermino:minutoTermino,
          })
        }
      })
    })
  }

  carregarAgendamentos = (dia) => {
    this.setState({arrayHoras:[]})
    var ref = database().ref(`/leonbarbershop/agendamentos`)

    var query = ref.orderByChild("dia").equalTo(dia)

    query.on("child_added", (snapshot) => {
      var idCabeleireiro = snapshot.child("idCabeleireiroAgenda").val()
      var horaInicio = snapshot.child("horaInicio").val()
      var minutoInicio = snapshot.child("minutoInicio").val()
      var horaFim = snapshot.child("horaFim").val()
      var minutoFim = snapshot.child("minutoFim").val()

      if(idCabeleireiro == this.state.idCabeleireiroAgenda){
        this.setState({
          arrayHoras:
          [...this.state.arrayHoras, ...[
            {
              horaInicio:horaInicio,
              minutoInicio:minutoInicio,
              horaFim:horaFim,
              minutoFim:minutoFim
            }
          ]]
        }) 
      }  
    })
  }

  selecionarHorario = (hora, minuto) => {
    var horario = hora + ":" + minuto
    this.setState({
      hora:hora,
      minuto:minuto,
      horarioSelecionado:horario
    }, () => {
      this.cancelarEscolhaHorario()
    })
  }

  abrirTimePicker = () => {
    this.TimePicker.open();
  }

  cancelarEscolhaHorario() {
    this.TimePicker.close();
  }

  mudarTela = (verTela) => {
    if(verTela == 0){
      this.carregarListaCortes();
      this.setState({verTela:0})

    }else if(verTela == 1){
      this.carregarListaCabeleireiros(this.state.idCorteAgenda);
      this.setState({verTela:1})

    }else if(verTela == 2){
      this.setState({
        dia:"",
        mes:"",
        ano:""
      })
      this.setState({verTela:2})

    }else if(verTela == 3){
      this.setState({
        hora:"",
        minuto:"",
        verTela:3,
        horarioSelecionado:"Selecionar horário"
      })

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
      tempoCorte:''
    })

    this.setState({
      idCorteAgenda:item.idCorte,
      nomeCorte:item.titulo,
      precoCorte:item.preco,
      tempoCorte:item.tempoMin
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
    var data = new Date(date);
    this.carregarAgendamentos(data.getDate())
    this.carregarHorarioDia(data.getDay());

    this.setState({
      dia:'',
      mes:'',
      ano:'',
    })

    this.setState({
      dia:data.getDate(),
      mes:data.getMonth(),
      ano:data.getFullYear(),
    })
  }

  _onPressDataAvancar = () => {
    if((!this.state.dia == null || !this.state.dia == "") && (!this.state.mes == null || !this.state.mes == "") && (!this.state.ano == null || !this.state.ano == "")){
      this.mudarTela(3)
    }else{
      Alert.alert("Erro", "Selecione uma data, por favor!")
    }
  }

  _onPressHorario = (item) => {
      this.setState({
        hora:'',
        minuto:'',
      }, () => {
        this.setState({
          hora:item.hora,
          minuto:item.minuto,
        
        })
      })

      
  
  }

  _onPressHorarioAvancar = () => {
    this.somaHora(this.state.hora+":"+ this.state.minuto, "00:"+ this.state.tempoCorte, true)
    if((!this.state.hora == null || !this.state.hora == "") && (!this.state.minuto == null || !this.state.minuto == "")){
      if(this.state.perfilUsuario === "normal"){
        this.mudarTela(4)
      
      }else if(this.state.perfilUsuario === "administrador"){
        this.mudarTela(5)
      }

    }else{
      Alert.alert("Erro", "Selecione um horário, por favor!")
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
                      <Text style={estilos.textoNormalProduto}>{item.tempoMin + " min"}</Text>
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
        <CalendarPicker
          onDateChange= {(data) => this._onPressData(data)}
          weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
          months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
          previousTitle="Anterior"
          nextTitle="Próximo"
          selectedDayColor={colors.corButtonLogin}
          selectedDayTextColor={colors.corBranca}
        />

        <TouchableOpacity onPress={() => this._onPressDataAvancar()} style={estilos.buttonAgendaAdmin}>
          <Text style={estilos.textoNegritoConta}>Avançar</Text>
        </TouchableOpacity>
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
        <View style={estilos.viewHorariosAgenda}>
          <Text style={estilos.textoHorarioInicialDisponivelAgenda}>{this.state.horaInicio + ":" + this.state.minutoInicio}</Text>
          <FlatList
            data={this.state.arrayHoras}
            renderItem={({ item }) => {
              return (
                <View style={[
                  estilos.viewHorariosAgendados,
                  { backgroundColor: colors.corSalmon },
                ]}>
                  <View style={{flexDirection:"column"}}>
                    <Text style={estilos.horariosAgenda}>{item.horaInicio + ":" + item.minutoInicio}</Text>
                    <Text style={estilos.horariosAgenda}>{item.horaFim + ":" + item.minutoFim}</Text>
                  </View>
                </View>
              ) 
            }}
            keyExtractor={item => item.id}
          />
          <Text style={estilos.textoHorarioTerminoDisponivelAgenda}>{this.state.horaTermino + ":" + this.state.minutoTermino}</Text>
          </View>
          <TimePicker
                  textCancel="Cancelar"
                  textConfirm="Confirmar"
                  selectedHour="00"
                  ref={ref => {
                    this.TimePicker = ref;
                  }}
                  onCancel={() => this.cancelarEscolhaHorario()}
                  onConfirm={(hour, minute) => this.selecionarHorario(hour, minute)}
                >
                </TimePicker>
          <View>
                <Text onPress={() => this.abrirTimePicker()} style={estilos.textoAgendaCliente}>{this.state.horarioSelecionado}</Text>
          </View>
          <TouchableOpacity onPress={() => this._onPressHorarioAvancar()} style={estilos.buttonAgendaAdmin}>
            <Text style={estilos.textoNegritoConta}>Avançar</Text>
          </TouchableOpacity>
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
          <Text style={estilos.textoResumoAgendaPrincipal}>Horario:</Text><Text style={estilos.textoResumoAgendaSecundario}>{this.state.hora + ":" + this.state.minuto + " às " + this.state.horaTermino + ":" + this.state.minutoTermino}</Text>

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

  somaHora(hrA, hrB, zerarHora) {
    if(hrA.length != 5 || hrB.length != 5) return "00:00";
   
    var temp = 0;
    var nova_h = 0;
    var novo_m = 0;

    var hora1 = hrA.substr(0, 2) * 1;
    var hora2 = hrB.substr(0, 2) * 1;
    var minu1 = hrA.substr(3, 2) * 1;
    var minu2 = hrB.substr(3, 2) * 1;
   
    temp = minu1 + minu2;
    while(temp > 59) {
            nova_h++;
            temp = temp - 60;
    }
    novo_m = temp.toString().length == 2 ? temp : ("0" + temp);

    temp = hora1 + hora2 + nova_h;
    while(temp > 23 && zerarHora) {
            temp = temp - 24;
    }
    nova_h = temp.toString().length == 2 ? temp : ("0" + temp);

    this.setState({
      horaTermino:nova_h,
      minutoTermino:novo_m
    })

    return nova_h + ":" + novo_m;
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
        this.state.horaTermino,
        this.state.minutoTermino,
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
        this.state.horaTermino,
        this.state.minutoTermino,
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
        this.state.horaTermino,
        this.state.minutoTermino,
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
              tempoMin:snapshot.child("tempoMin").val()
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
      tempoMin:'',
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