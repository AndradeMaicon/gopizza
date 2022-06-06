import React from 'react';
import { ActivityIndicator } from 'react-native';
import { PressableProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Title, TypeProps } from './styles';

export interface ButtonProps extends PressableProps {
  type?: TypeProps;
  title: string;
  isLoading?: boolean;
}

export function Button({type = 'primary', title, isLoading = false, ...rest}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container type={type} disabled={isLoading} {...rest}>
      {isLoading
        ? <ActivityIndicator color={theme.COLORS.TITLE} />
        : <Title>{title}</Title>
      }
    </Container>
  );
}