import React from 'react';
import {View, BackHandler, ScrollView, Text, Alert, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import Modal from "react-native-modal";

import estilos from '../../styles/estilos';
import colors from '../../styles/colors';

export default class GestaoCabeleireiros extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      modalVisible: false,
    };
    
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Cadastramento');
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={estilos.scrollViewLogin}>
        <View style={estilos.viewInicialLogin}>
          <View style={{height:100}}>          
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} 
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
                }}>
            <View style={{color: colors.corVerdeApp,alignItems:"center", justifyContent:"center"}}>
                <Text>Hello World!</Text>

                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableOpacity>
            </View>
          </Modal>
          </View>

          <ActionButton buttonColor={colors.corButtonLogin} onPress={() => {this.setModalVisible(true)}}/>

        </View>
      </ScrollView>
    );
  }
}