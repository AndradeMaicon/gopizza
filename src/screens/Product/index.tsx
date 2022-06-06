import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import * as ImagePicker from 'expo-image-picker';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


import {
  Container,
  DeleteLabel,
  PickImageButton,
  Title,
  Upload,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from './styles';

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if(!result.cancelled) {
        setImage(result.uri)
      }
    }

  }

  async function handleAdd() {
    if(!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.');
    }

    if(!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.');
    }

    if(!image.trim()) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.');
    }

    if(!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos pizza.');
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image)
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        price_size: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => Alert.alert('Cadastro', 'Pizza castrada com sucesso.'))
      .catch(() => Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.'))

    setIsLoading(false);
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={theme.COLORS.GRADIENT}
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: getStatusBarHeight() + 33,
            paddingHorizontal: 24,
            paddingBottom: 20 
          }}
        >
          <ButtonBack />
          <Title>Cadastrar</Title>
          <TouchableOpacity>
            <DeleteLabel>Deletar</DeleteLabel>
          </TouchableOpacity>
        </LinearGradient>

        <Upload>
          <Photo uri={image}/>

          <PickImageButton title='Carregar' type='secondary' onPress={handlePickerImage}/>
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input
              onChangeText={setName}
              value={name}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracters</MaxCharacters>
            </InputGroupHeader>

            <Input
              multiline
              maxLength={60}
              style={{
                height: 80,
              }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice
              size='P'
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size='M'
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size='G'
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          <Button 
            title='Cadastrar pizza' 
            isLoading={isLoading}
            onPress={handleAdd}
          />
        </Form>
      </ScrollView>
    </Container>
  );
}