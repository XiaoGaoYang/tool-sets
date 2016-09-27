import React, { Component } from 'react';
import { StyleSheet,View,Picker,Alert,ScrollView,Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import {
  Container,
  Content,
  Text,
  Input,
  InputGroup,
  Icon,
  Button,
  Card,
  CardItem,
  Spinner
} from 'native-base';

// Content = Animatable.createAnimatableComponent(Content);

import DismissKeyboard from 'dismissKeyboard';

import NavBar from '../NavBar/NavBar';
import Theme from '../NativeBaseTheme';
import NetUtil from '../NetUtil';

// import TestData from './TestData';

export default class FastMail extends Component {
  constructor(props){
    super(props);
    this.state = {
      // 快递公司
      company: 'yuantong',
      // 快递单号
      codeNumber: '',
      // 快递信息
      fastMailInfo: null,
      // 是否正在查询中
      querying: false,
    };

    // 事件绑定
    this.onReturn = this.onReturn.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onQuery = this.onQuery.bind(this);

    this.renderRow = this.renderRow.bind(this);
  }
  componentDidMount(){
    console.log('FastMail did mount');
  }
  // 返回
  onReturn(){
    const navigator = this.props.navigator;
    if(navigator){
      const routes = navigator.getCurrentRoutes();
      navigator.pop();
    }
  }
  // Picker值发生变化
  onSelectChange(value){
    this.setState({
      company: value
    });
  }
  // input值发生变化
  onChangeText(value){
    this.setState({
      codeNumber: value
    });
  }
  // 查询
  onQuery(){
    DismissKeyboard();

    if(!this.state.codeNumber){
      Alert.alert('提示','请输入快递单号',[{text:'确定'}]);
      return;
    }
    this.setState({
      querying: true,
    });
    let url = 'https://www.kuaidi100.com/query?type='+this.state.company+'&postid='+this.state.codeNumber;
    NetUtil.get(url,(response)=>{
      this.setState({
        fastMailInfo: response,
        querying: false,
      });
    });

    /* 测试用
    this.setState({
      fastMailInfo: TestData,
      querying: false,
    });
    */
  }
  // 渲染行
  renderRow(item,sectionID,rowID){
    const firstItemStyle = [];
    if(parseInt(rowID) === 0){
      firstItemStyle.push(styles.firstItemStyle);
    }
    return (
      <Animatable.View animation="zoomInUp">
        <CardItem header style={styles.cardHeader}>
          <Text style={firstItemStyle}>{ item.time }</Text>
        </CardItem>
        <CardItem>
          <Text style={firstItemStyle}>{ item.context }</Text>
        </CardItem>
      </Animatable.View>
    );
  }
  // 渲染快递查询结果
  renderFastMailInfo(){
    if(this.state.querying){
      return <Spinner />;
    }
    // 查询前
    if(!this.state.fastMailInfo){
      return null;
    // 无查询结果
    }else if( !this.state.fastMailInfo.data || !this.state.fastMailInfo.data.length || this.state.fastMailInfo.status !== '200'){
      return (
        <Animatable.View animation="zoomIn" style={styles.fastMailInfo}>
          <Image source={require('../img/sorry.png')} />
          <Text style={styles.resultTitle}>抱歉，没有查到你的快递信息</Text>
        </Animatable.View>
      );
    }
    // 查询正确
    return (
      <Card dataArray={this.state.fastMailInfo.data} renderRow={this.renderRow}></Card>
    );
  }
  render(){
    return(
      <Container style={styles.container} theme={Theme}>
        <View>
          <NavBar
              leftText={"返回"}
              // title={"快递查询"}
              onLeftPress={this.onReturn}
            />
        </View>
        <View style={styles.inputContainer}>
          <InputGroup borderType='underline' >
            <Icon name='pencil' style={styles.iconText} />
            <Input
              placeholder='输入快递单号'
              keyboardType='numeric'
              onChangeText={this.onChangeText}
            />
          </InputGroup>
          <Picker
            selectedValue={this.state.company}
            onValueChange={this.onSelectChange}
            >
            <Picker.Item label="圆通快递" value="yuantong" />
            <Picker.Item label="申通快递" value="shentong" />
            <Picker.Item label="中通快递" value="zhongtong" />
            <Picker.Item label="韵达快递" value="yunda" />
            <Picker.Item label="顺丰快递" value="shunfeng" />
            <Picker.Item label="天天快递" value="tiantian" />
            <Picker.Item label="百世汇通" value="huitongkuaidi" />
          </Picker>
          <Button block style={styles.button} onPress={this.onQuery}>查询</Button>
        </View>
        <Content>
          { this.renderFastMailInfo() }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputContainer: {
    margin: 8,
  },
  iconText: {
    fontSize: 18,
    color: '#rgba(0, 0, 0, 0.45)',
  },
  cardHeader: {
    marginTop: 8,
  },
  resultTitle: {
    // textAlign:'center',
    // fontSize: 18,
    color: '#cccccc'
  },
  fastMailInfo: {
    'marginTop': 20,
    'justifyContent': 'center',
    'alignItems': 'center',
  },
  firstItemStyle: {
    color: 'green',
  }
});