import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView, Platform } from 'react-native';

import brandImg from '@assets/brand.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import {
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel
} from './styles';
import { useAuth } from '@hooks/auth';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const { signIn, isLogging, forgotPassword } = useAuth();

  function handleSignIn() {
    signIn(email, password)
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <LinearGradient
      colors={theme.COLORS.GRADIENT}
      start={{
        x: 0,
        y: 1
      }}
      end={{
        x: 0.5,
        y: 0.5,
      }}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Content>
          <Brand source={brandImg}/>

          <Title>Login</Title>

          <Input
            type='secondary'
            placeholder='E-mail'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={setEmail}
          />
          <Input
            type='secondary'
            placeholder='Senha'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={setPassword}
            secureTextEntry
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button 
            title='Entrar'
            type='secondary' 
            isLoading={!isLogging} 
            onPress={handleSignIn}
          />
        </Content>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}