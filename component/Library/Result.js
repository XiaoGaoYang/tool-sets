import React,{Component} from 'react';
import { View,Text } from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Title
} from 'native-base';

export default class Result extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Container>
        <Header>
          <Button transparent>
            <Icon name="arrow-left" style={{fontSize:21}} />
          </Button>
          <Title>搜索结果</Title>
        </Header>
      </Container>
    );
  }
}