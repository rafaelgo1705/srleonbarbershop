import React from 'react';
import {View, Text, Image, Picker, BackHandler, Switch, Alert, TouchableOpacity, TextInput, ScrollView} from 'react-native';

import estilos from '../styles/estilos';

import database from '@react-native-firebase/database';

import moment from 'moment';

export default class PainelAdministrativo extends React.Component {
  constructor(props){
    super(props);

    this.state = {text: "", inputTitulo: ""}
    this.state = {text: "", inputTexto: ""}
    this.state = {statusBarbearia: false}
    this.state = {horaInicioSegSex: null}
    this.state = {horaFimSegSex: null}
    this.state = {horaInicioSab: null}
    this.state = {horaFimSab: null}
    this.state = {horaInicioDom: null}
    this.state = {horaFimDom: null}

    this.state = ({
      textos: []
    });

    this.carregarDados();
  }

  carregarDados = () => {
    var ref = database().ref("/leonbarbershop/textos");

    ref.once("value", (snapshot) => {
      let textos = [];
      textos = [
        snapshot.child("textoTitulo").val(),
        snapshot.child("textoNormal").val(),
        snapshot.child("statusAtendimento").val(),
        snapshot.child("horarioAtendimento/0/SegSexInicio").val(),
        snapshot.child("horarioAtendimento/0/SegSexFim").val(),
        snapshot.child("horarioAtendimento/0/SabInicio").val(),
        snapshot.child("horarioAtendimento/0/SabFim").val(),
        snapshot.child("horarioAtendimento/0/DomInicio").val(),
        snapshot.child("horarioAtendimento/0/DomFim").val(),   
      ]

      this.setState({textos:textos})
      this.setState({inputTitulo:textos[0]})
      this.setState({inputTexto:textos[1]})
      this.setState({statusBarbearia:textos[2]})
      this.setState({horaInicioSegSex:textos[3]})
      this.setState({horaFimSegSex:textos[4]})
      this.setState({horaInicioSab:textos[5]})
      this.setState({horaFimSab:textos[6]})
      this.setState({horaInicioDom:textos[7]})
      this.setState({horaFimDom:textos[8]})
    });
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Conta');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();

    this.state = {text: "", inputTitulo: ""}
    this.state = {text: "", inputTexto: ""}
    this.state = {statusBarbearia: false}
    this.state = ({
      textos: []
    });
  }

  diaDaSemana(date) {
    var semana = new Array(7);
    semana[0] = "Domingo";
    semana[1] = "SegSex";
    semana[2] = "SegSex";
    semana[3] = "SegSex";
    semana[4] = "SegSex";
    semana[5] = "SegSex";
    semana[6] = "Sabado";
    
    return semana[date.getDay()];
  }

  alterarDados = () => {
      var dayOfWeek = moment().toDate();
      var diaDaSemana = this.diaDaSemana(dayOfWeek);

      var ref = database().ref('/leonbarbershop/textos');

      var titulo = this.state.inputTitulo;
      var texto = this.state.inputTexto;
      var statusBarbearia = this.state.statusBarbearia;
      var SegSexInicio = this.state.horaInicioSegSex;
      var SegSexFim = this.state.horaFimSegSex;
      var SabInicio = this.state.horaInicioSab;
      var SabFim = this.state.horaFimSab;
      var DomInicio = this.state.horaInicioDom;
      var DomFim = this.state.horaFimDom;

      let arrayHorarios = [{
        SegSexInicio:SegSexInicio,
        SegSexFim:SegSexFim,
        SabInicio:SabInicio,
        SabFim:SabFim,
        DomInicio:DomInicio,
        DomFim:DomFim,
        DiaSemana:diaDaSemana
      }]

      if(this.validarCampos(titulo, texto)){
        ref.set({
          textoTitulo: titulo,
          textoNormal: texto,
          statusAtendimento: statusBarbearia,
          horarioAtendimento: arrayHorarios
        }).then(function(){
          Alert.alert("Sucesso", "Os dados foram alterados!")
        }).catch(function(){
          Alert.alert("Erro", "Não foi possível alterar os dados!")
        });
      }
  }

  validarCampos(titulo, texto){
    var erro = "";

    if(titulo == "" || titulo == null){
      erro += "O campo Título está vazio!\n"
    }
    if(texto == "" || texto == null){
      erro += "O campo Texto está vazio!\n"
    }

    if(erro.length == 0){
      return true;

    }else{
      Alert.alert("Erro", erro)
      return false;
    }

  }

  selecionarStatus = (value) => {
    this.setState({statusBarbearia: value});

  }

  selecionarSegSex = (value) => {
    this.setState({selecionarSegSex:value})

  }

  selecionarSab = (value) => {
    this.setState({selecionarSab:value})

  }

  selecionarDom = (value) => {
    this.setState({selecionarDom:value})

  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewRedefinirSenha}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Conta')} style={estilos.viewInicialCadastro}>
              <Image source={require('../imagens/icons/voltar_icon.png')}></Image>
              <Text style={estilos.textLoginInicial}>Painel</Text>
            </TouchableOpacity>

          <TextInput
                maxLength={35}
                onChangeText={inputTitulo => this.setState({inputTitulo:inputTitulo})}
                value={this.state.inputTitulo}
                blurOnSubmit={false}
                onSubmitEditing={() => { this.inputTexto.focus(); }}
                style={estilos.textLoginInput} 
                placeholder='Título...' 
                textContentType='none'>
            </TextInput>

            <TextInput
                multiline
                numberOfLines={4}
                maxLength={200}
                onChangeText={inputTexto => this.setState({inputTexto:inputTexto})}
                value={this.state.inputTexto}
                ref={(input) => { this.inputTexto = input; }}
                style={estilos.textInputTexto} 
                placeholder='Texto de início...'
                textContentType='none'>
            </TextInput>

            <Text style={estilos.textHorarioAtendimentoInicial}> Horário de Atendimento</Text>
            <View style={{flexDirection:"column"}}>
              <View style={{flexDirection:"row", alignItems: 'center'}}>
                <Switch style={estilos.switchStatusBarbearia} value = {this.state.selecionarSegSex} onValueChange = {this.selecionarSegSex}/>
                <Text style={estilos.textHorarioAtendimento}>SEG À SEX</Text>
                <Picker
                  selectedValue={this.state.horaInicioSegSex}
                  style={estilos.pickerHorarioAtendimento}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({horaInicioSegSex: itemValue})
                  }>
                  <Picker.Item label="07:00" value="07" />
                  <Picker.Item label="08:00" value="08" />
                  <Picker.Item label="09:00" value="09" />
                  <Picker.Item label="10:00" value="10" />
                  <Picker.Item label="11:00" value="11" />
                  <Picker.Item label="12:00" value="12" />
                  <Picker.Item label="13:00" value="13" />
                  <Picker.Item label="14:00" value="14" />
                  <Picker.Item label="15:00" value="15" />
                  <Picker.Item label="16:00" value="16" />
                  <Picker.Item label="17:00" value="17" />
                  <Picker.Item label="18:00" value="18" />
                  <Picker.Item label="19:00" value="19" />
                  <Picker.Item label="20:00" value="20" />
                  <Picker.Item label="21:00" value="21" />
                  <Picker.Item label="22:00" value="22" />
                  <Picker.Item label="23:00" value="23" />
                  
                </Picker>
                <Text style={estilos.textHorarioAtendimentoNormal}>-</Text>
                <Picker
                  selectedValue={this.state.horaFimSegSex}
                  style={estilos.pickerHorarioAtendimento}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({horaFimSegSex: itemValue})
                  }>
                  <Picker.Item label="07:00" value="07" />
                  <Picker.Item label="08:00" value="08" />
                  <Picker.Item label="09:00" value="09" />
                  <Picker.Item label="10:00" value="10" />
                  <Picker.Item label="11:00" value="11" />
                  <Picker.Item label="12:00" value="12" />
                  <Picker.Item label="13:00" value="13" />
                  <Picker.Item label="14:00" value="14" />
                  <Picker.Item label="15:00" value="15" />
                  <Picker.Item label="16:00" value="16" />
                  <Picker.Item label="17:00" value="17" />
                  <Picker.Item label="18:00" value="18" />
                  <Picker.Item label="19:00" value="19" />
                  <Picker.Item label="20:00" value="20" />
                  <Picker.Item label="21:00" value="21" />
                  <Picker.Item label="22:00" value="22" />
                  <Picker.Item label="23:00" value="23" />
                  
                </Picker>
                
                
              </View>
              <View style={{flexDirection:"row", alignItems: 'center'}}>
                <Switch style={estilos.switchStatusBarbearia} value = {this.state.selecionarSab} onValueChange = {this.selecionarSab}/>
                <Text style={estilos.textHorarioAtendimento}>SÁB</Text>
                <Picker
                  selectedValue={this.state.horaInicioSab}
                  style={estilos.pickerHorarioAtendimento}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({horaInicioSab: itemValue})
                  }>
                  <Picker.Item label="07:00" value="07" />
                  <Picker.Item label="08:00" value="08" />
                  <Picker.Item label="09:00" value="09" />
                  <Picker.Item label="10:00" value="10" />
                  <Picker.Item label="11:00" value="11" />
                  <Picker.Item label="12:00" value="12" />
                  <Picker.Item label="13:00" value="13" />
                  <Picker.Item label="14:00" value="14" />
                  <Picker.Item label="15:00" value="15" />
                  <Picker.Item label="16:00" value="16" />
                  <Picker.Item label="17:00" value="17" />
                  <Picker.Item label="18:00" value="18" />
                  <Picker.Item label="19:00" value="19" />
                  <Picker.Item label="20:00" value="20" />
                  <Picker.Item label="21:00" value="21" />
                  <Picker.Item label="22:00" value="22" />
                  <Picker.Item label="23:00" value="23" />
                  
                </Picker>
                <Text style={estilos.textHorarioAtendimentoNormal}>-</Text>
                <Picker
                  selectedValue={this.state.horaFimSab}
                  style={estilos.pickerHorarioAtendimento}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({horaFimSab: itemValue})
                  }>
                  <Picker.Item label="07:00" value="07" />
                  <Picker.Item label="08:00" value="08" />
                  <Picker.Item label="09:00" value="09" />
                  <Picker.Item label="10:00" value="10" />
                  <Picker.Item label="11:00" value="11" />
                  <Picker.Item label="12:00" value="12" />
                  <Picker.Item label="13:00" value="13" />
                  <Picker.Item label="14:00" value="14" />
                  <Picker.Item label="15:00" value="15" />
                  <Picker.Item label="16:00" value="16" />
                  <Picker.Item label="17:00" value="17" />
                  <Picker.Item label="18:00" value="18" />
                  <Picker.Item label="19:00" value="19" />
                  <Picker.Item label="20:00" value="20" />
                  <Picker.Item label="21:00" value="21" />
                  <Picker.Item label="22:00" value="22" />
                  <Picker.Item label="23:00" value="23" />
                  
                </Picker>
              </View>
              
              <View style={{flexDirection:"row", alignItems: 'center'}}>
                <Switch style={estilos.switchStatusBarbearia} value = {this.state.selecionarDom} onValueChange = {this.selecionarDom}/>
                <Text style={estilos.textHorarioAtendimento}>DOM</Text>
                <Picker
                  selectedValue={this.state.horaInicioDom}
                  style={estilos.pickerHorarioAtendimento}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({horaInicioDom: itemValue})
                  }>
                  <Picker.Item label="07:00" value="07" />
                  <Picker.Item label="08:00" value="08" />
                  <Picker.Item label="09:00" value="09" />
                  <Picker.Item label="10:00" value="10" />
                  <Picker.Item label="11:00" value="11" />
                  <Picker.Item label="12:00" value="12" />
                  <Picker.Item label="13:00" value="13" />
                  <Picker.Item label="14:00" value="14" />
                  <Picker.Item label="15:00" value="15" />
                  <Picker.Item label="16:00" value="16" />
                  <Picker.Item label="17:00" value="17" />
                  <Picker.Item label="18:00" value="18" />
                  <Picker.Item label="19:00" value="19" />
                  <Picker.Item label="20:00" value="20" />
                  <Picker.Item label="21:00" value="21" />
                  <Picker.Item label="22:00" value="22" />
                  <Picker.Item label="23:00" value="23" />
                  
                </Picker>
                <Text style={estilos.textHorarioAtendimentoNormal}>-</Text>
                <Picker
                  selectedValue={this.state.horaFimDom}
                  style={estilos.pickerHorarioAtendimento}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({horaFimDom: itemValue})
                  }>
                  <Picker.Item label="07:00" value="07" />
                  <Picker.Item label="08:00" value="08" />
                  <Picker.Item label="09:00" value="09" />
                  <Picker.Item label="10:00" value="10" />
                  <Picker.Item label="11:00" value="11" />
                  <Picker.Item label="12:00" value="12" />
                  <Picker.Item label="13:00" value="13" />
                  <Picker.Item label="14:00" value="14" />
                  <Picker.Item label="15:00" value="15" />
                  <Picker.Item label="16:00" value="16" />
                  <Picker.Item label="17:00" value="17" />
                  <Picker.Item label="18:00" value="18" />
                  <Picker.Item label="19:00" value="19" />
                  <Picker.Item label="20:00" value="20" />
                  <Picker.Item label="21:00" value="21" />
                  <Picker.Item label="22:00" value="22" />
                  <Picker.Item label="23:00" value="23" />
                  
                </Picker>
              </View>
            </View>

          <View style={estilos.viewPainelAdminStatus}>
            <Switch style={estilos.switchStatusBarbearia} onValueChange = {this.selecionarStatus} value = {this.state.statusBarbearia}/>
            <Text style={estilos.textoStatus}>{this.state.statusBarbearia?'Aberto agora':'Fechado'}</Text>     
          </View>

          <TouchableOpacity onPress={this.alterarDados} style={estilos.buttonRedefinirSenhaAlterar}>
            <Text style={estilos.buttonLoginTexto} >Alterar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}