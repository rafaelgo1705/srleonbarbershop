import React from 'react';
import {SafeAreaView, TouchableOpacity, FlatList, Text, Image, View} from 'react-native';

import colors from '../../styles/colors';
import estilos from '../../styles/estilos';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    nome: 'Sr León',
    avaliacao: 'avaliação',
  },
];

function Item({ id, nome, avaliacao, selected, onSelect }) {
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
        <Text style={estilos.title}>{nome}</Text>
        <Text style={estilos.textoNormalProduto}>{avaliacao}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ListViewAgendaCabeleireiros() {
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
      <Text style={estilos.textoNegritoAgenda}>Selecione o cabeleireiro</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            nome={item.nome}
            avaliacao={item.avaliacao}
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
