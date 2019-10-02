import React from 'react';
import {View, StatusBar, Image} from 'react-native';

import estilos from '../styles/estilos';
import colors from '../styles/colors';

import auth from '@react-native-firebase/auth';
import ConfigFirebase from '../database/ConfigFirebase';

import SplashScreenController from '../controller/SplashScreenController';

export default class SplashScreen extends React.Component {
    componentDidMount() {
        var proper = this.props;
        this.firebaseConf = new ConfigFirebase();
        this.firebaseConf.configFirebase();

        auth().onAuthStateChanged(function(user) {
            if (user) {
                this.splashScreenController = new SplashScreenController();
                this.splashScreenController.abrirTelaInicial(proper);
                
            } else {
                this.splashScreenController = new SplashScreenController();
                this.splashScreenController.abrirTelaLogin(proper);
              
            }
          });
      }
      render() {
        return (
          <View style={estilos.splashScreen}>
              <StatusBar backgroundColor={colors.corApp} barStyle="light-content" />
              <Image source={require('../imagens/logo.png')} style={{marginBottom: 0, padding: 0, height:230, width:230}}></Image>
          </View>
        );
      }
}
