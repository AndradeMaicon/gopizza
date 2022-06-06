import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Search } from '@components/Search';

import happyEmoji from '@assets/happy.png';

import {
  Container,
  Greeting,
  GreetingEmoji,
  GreetingText,
} from './styles';

export function Home() {
  const theme = useTheme();

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

      <Search onClear={() => {}} onSearch={() => console.log('Text')} />
    </Container>
  );
}