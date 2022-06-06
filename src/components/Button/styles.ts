import styled, { css } from 'styled-components/native';
import { Pressable } from 'react-native';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeProps;
}

export const Container = styled(Pressable)<ContainerProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;

  background-color: ${({theme, type}) => type === 'primary' ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};
`;

export const Title = styled.Text`
  font-size: 14px;
  ${({ theme }) => css`
    color: ${theme.COLORS.TITLE};
    font-family: ${theme.FONTS.TEXT};
  `}
`;