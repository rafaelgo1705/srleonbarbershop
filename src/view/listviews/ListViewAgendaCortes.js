import React from 'react';
import {SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, Image, View} from 'react-native';

import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Social',
    texto: 'detalhe',
    preco: 'R$ 15,00',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Barba',
    texto: 'detalhe',
    preco: 'R$ 10,00',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Moderno',
    texto: 'detalhe',
    preco: 'R$ 20,00',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
    title: 'Estiloso',
    texto: 'detalhe',
    preco: 'R$ 25,00',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b2',
    title: 'Estiloso',
    texto: 'detalhe',
    preco: 'R$ 25,00',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b3',
    title: 'Estiloso',
    texto: 'detalhe',
    preco: 'R$ 25,00',
  },
];

function Item({ id, title, texto, preco, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        estilos.item,
        { backgroundColor: selected ? colors.corSelecionado : colors.corBranca },
      ]}
    >
      <Image source={require('../../imagens/user.png')} style={{justifyContent: 'flex-start', alignContent: 'center', marginBottom: 0, padding: 0, height:50, width:50}}/>
      <View style={{flexDirection:'column'}}>
        <Text style={estilos.title}>{title}</Text>
        <Text style={estilos.textoNormalProduto}>{texto}</Text>
      </View>
      <View style={estilos.estiloPreco}>
        <Text style={estilos.textoPreco}>{preco}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ListViewAgendaCortes() {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  return (
    <SafeAreaView style={estilos.containerListViewAgenda}>
      <Text style={estilos.textoNegritoAgenda}>Selecione o corte</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            texto={item.texto}
            preco={item.preco}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
  
    </SafeAreaView>
  );
}
