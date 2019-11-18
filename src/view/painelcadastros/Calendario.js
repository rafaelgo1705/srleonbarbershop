import React from 'react';
import {View, BackHandler, Text, Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

import database from '@react-native-firebase/database';
import { ScrollView } from 'react-native-gesture-handler';

import {CalendarList, LocaleConfig, Agenda} from 'react-native-calendars';

export default class Calendario extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        dia: '',
        mes: '',
        ano: '',
      }

      LocaleConfig.locales['pt-br'] = {
        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
        today: 'Hoje'
      };
      LocaleConfig.defaultLocale = 'pt-br';
    }

    componentDidMount() {
        this.carregarCalendario()
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Menu');
            return true;
        });
    }
    
    componentWillUnmount() {
        this.backHandler.remove();
    }

    selecionarDiaCalendario = (date) => {
      this.setState({date:date})
      this.carregarCalendario();
    }

    carregarCalendario = () => {
      var ref = database().ref("/leonbarbershop/calendario");
      

    }

    _onPressData = (date) => {
      this.setState({
        dia: date.day,
        mes: date.month,
        ano: date.year,
      })
      console.log(date.day)
    }

    render() {
        return (
            <View style={estilos.viewTabs}>
              <View style={estilos.viewSuperiorStatus}>
                <Text style={estilos.textLoginInicial}>Calendário</Text>
              </View>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <CalendarList
                  horizontal={true}
                  pagingEnabled={true}

                  markedDates={{
                    '2019-11-03': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'},
                    '2019-11-10': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'},
                    '2019-11-17': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'},
                    '2019-11-24': {startingDay: true, endingDay: true, disabled: false, color: 'red', textColor: 'white'}
                  }}
                  markingType={'period'}

                  onDayPress={(date) => {
                    this._onPressData(date)
                  }}
                />
              </ScrollView>
              <ActionButton position="left" buttonColor={colors.corVermelhaApp} onPress={() => this.props.navigation.navigate("Menu")}
                renderIcon={() => (<Ionicons color={colors.corBranca} name="md-arrow-back" size={25}/> )}/>
            </View>
        );
    }

}