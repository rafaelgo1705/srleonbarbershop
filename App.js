/**
 * Caminho: cd Desktop/BarberShop/Projeto/barbershop
 * react-native run-android
 */

import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator} from 'react-navigation-tabs';

import colors from './src/styles/colors';

import Home from './src/view/tabs/Home';
import Agenda from './src/view/tabs/Agenda';
import Status from './src/view/tabs/Status';
import Conta from './src/view/tabs/Conta';
import Login from './src/view/Login';
import Cadastro from './src/view/Cadastro';
import SplashScreen from './src/view/SplashScreen';
import RedefinirSenha from './src/view/RedefinirSenha';
import EditarConta from './src/view/EditarConta';
import PainelAdministrativo from './src/view/PainelAdministrativo';
import CadastroAdministrativo from './src/view/CadastroAdministrativo';
import GestaoCabeleireiros from './src/view/painelcadastros/GestaoCabeleireiros';
import GestaoCortes from './src/view/painelcadastros/GestaoCortes';
import Agendamentos from './src/view/painelcadastros/Agendamentos';
import Calendario from './src/view/painelcadastros/Calendario';

const AppCreateBottomTabNavigator = createBottomTabNavigator({
  Home,
  Agenda,
  //Status,
  Conta
  
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let typeIcon = 'md';
        
        if (routeName === 'Home') {
          iconName = typeIcon+`-home`;
          
        } else if (routeName === 'Agenda') {
          iconName = typeIcon+`-calendar`;

        } else if (routeName === 'Status') {
          iconName = typeIcon+`-paper`;

        } else if (routeName === 'Conta') {
          iconName = typeIcon+`-contact`;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }, 
      tabBarOptions:{
        activeTintColor: colors.corIconesAtivos,
        inactiveTintColor: colors.corIconesInativos,
      }
    }),
  }
);

const AppCreateBottomTabNavigatorPainel = createBottomTabNavigator ({
  Painel: {screen: PainelAdministrativo},
  Menu: {screen: CadastroAdministrativo}
}, {
  initialRouteName: 'Painel',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      let typeIcon = 'md';
      
      if (routeName === 'Painel') {
        iconName = typeIcon+`-browsers`;
        
      } else if (routeName === 'Menu') {
        iconName = typeIcon+`-filing`;
      } 

      return <IconComponent name={iconName} size={25} color={tintColor} />;
    }, 
    tabBarOptions:{
      activeTintColor: colors.corIconesAtivos,
      inactiveTintColor: colors.corIconesInativos,
    }
  }),
}
);

const AppCreateSwitchNavigator = createSwitchNavigator ({
  SplashScreen:{screen: SplashScreen},
  Login:{screen: Login},
  Cadastro: {screen: Cadastro},
  TabInicial: {screen: AppCreateBottomTabNavigator},

  RedefinirSenha: {screen: RedefinirSenha},
  EditarConta: {screen: EditarConta},
  TabPainel: {screen: AppCreateBottomTabNavigatorPainel},

  GestaoCabeleireiros: {screen: GestaoCabeleireiros},
  GestaoCortes:{screen:GestaoCortes},
  Agendamentos:{screen:Agendamentos},
  Calendario:{screen:Calendario}
},{
  initialRouteName: 'SplashScreen'
})

export default createAppContainer(AppCreateSwitchNavigator);
