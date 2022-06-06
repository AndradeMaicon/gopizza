import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  Input,
  Button,
  InputArea,
  ButtonClear,
} from './styles';

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
}

export function Search({onClear, onSearch, ...rest}: Props) {
  const theme = useTheme();

  const recProps = {
    ...rest,
    onPress: onSearch
  }

  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name='x' size={16} />
        </ButtonClear>
      </InputArea>

      <Button {... recProps}>
        <Feather name='search' size={16} color={theme.COLORS.TITLE} />
      </Button>
    </Container>
  );
}