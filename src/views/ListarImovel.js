import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const PropertyList = () => {
  const [searchText, setSearchText] = useState('');
  const [propertyData, setPropertyData] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://andersonsenafilho.pythonanywhere.com/api/imoveis/');
      if (!response.ok) {
        throw new Error('Erro na busca de dados');
      }
      const data = await response.json();
      setPropertyData(data);
    } catch (error) {
      console.error('Erro na busca de dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity   style={styles.card}
    onPress={() => {
      navigation.navigate('LOGIN', { id: item.id });
    }}>
      
      <Image source={{ uri: item.foto }} style={styles.foto} />
      <View style={styles.cardBody}>
        <Text style={styles.preço}>{item.preço}</Text>
        <Text style={styles.endereço}>{item.endereço}</Text>
        <Text style={styles.metros_quadrados}>{item.metros_quadrados} Metros Quadrados</Text>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.quarto}>{item.quarto} Quarto</Text>
        <Text style={styles.banheiro}>{item.banheiro} Banheiro</Text>
        <Text style={styles.estacionamento}>{item.estacionamento} estacionamento</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredData = propertyData.filter((item) => {
    return item.endereço && item.endereço.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  propertyListContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  foto: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  preço: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  endereço: {
    fontSize: 16,
    marginBottom: 5,
  },
  metros_quadrados: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  quarto: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  banheiro: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  estacionamento: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold',
  },
});

export default PropertyList;
