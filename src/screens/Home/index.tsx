import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';

import { Search } from '@components/Search';
import { ProductCard, ProductProps } from '@components/ProductCard';
import happyEmoji from '@assets/happy.png';

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Title,
  MenuHeader,
  MenuItemsNumber,
} from './styles';
import { FlatList } from 'react-native-gesture-handler';


export function Home() {
  const theme = useTheme();

  const [pizzas, setPizzas] = useState<ProductProps[]>([])
  const [search, setSearch] = useState('');

  function fetchPizza(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection('pizzas')
      .orderBy('name_insensitive')
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then(response => {
        const data = response.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as ProductProps[];

        setPizzas(data)
      }).catch(() => Alert.alert('Consulta', 'Não foi possível realizar a consulta.'))
  }

  function handleSearch() {
    fetchPizza(search);
  }

  function handleSearchClear() {
    setSearch('');
    fetchPizza('');
  }


  useEffect(() => {
    fetchPizza('')
  }, [])

  return (
    <Container>
      <LinearGradient
          colors={theme.COLORS.GRADIENT}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: getStatusBarHeight() + 33,
            paddingHorizontal: 24,
            paddingBottom: 58 
          }}
        >
        <Greeting>
          <GreetingEmoji source={happyEmoji}/>
          <GreetingText>Ola, Amigo</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={() => console.log('Clicked')}>
          <MaterialIcons name='logout' color={theme.COLORS.TITLE} size={24}/>
        </TouchableOpacity>

      </LinearGradient>

      <Search
        onChangeText={setSearch}
        value={search} 
        onSearch={handleSearch} 
        onClear={handleSearchClear} 
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 pizzas</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24
        }}
      />

      
    </Container>
  );
}