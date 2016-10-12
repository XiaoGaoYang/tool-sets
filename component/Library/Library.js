import React,{ Component } from 'react';
import { StyleSheet,View,TouchableOpacity,ScrollView,TextInput,Image } from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import * as Animatable from 'react-native-animatable';
import {
  Container,
  Content,
  Header,
  Title,
  Button,
  InputGroup,
  Icon,
  Input,
  List,
  ListItem,
  Text,
  Spinner,
  Thumbnail
} from 'native-base';
import Theme from '../NativeBaseTheme';
import NetUtil from '../NetUtil';
import Config from '../Config';

import TestData from './TestData';

// import Result from './Result';

export default class Library extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      keyword:'',
      editing:true,
      searching:false,
      searchResult:null,
    };
    

    // 测试-搜索列表展示页面
    /*
    this.state = {
      keyword:'123',
      editing:false,
      searching:false,
      searchResult:TestData,
    };
    */

    this.renderRow = this.renderRow.bind(this);

    this.onReturn = this.onReturn.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  // 返回
  onReturn(){
    // DismissKeyboard();
    console.log('return');
    const navigator = this.props.navigator;
    if(navigator){
      navigator.pop();
    }
  }

  // 输入框文本改变
  onChangeText(value){
    this.setState({
      keyword:value,
      editing:true,
    });
  }

  // 搜索
  onSearch(){
    DismissKeyboard();
    this.setState({
      searching:true,
      editing:false,
    })
    // 实际用
    NetUtil.postJson(Config.api.library,{keyword:this.state.keyword},(res)=>{
      this.setState({
        searchResult:res,
        searching:false,
      });
    });
    
    // 测试
    /*
    console.log('search');
    setTimeout(() => {
      this.setState({
        searchResult:TestData,
        searching:false,
      });
    },3000);
    */
    
  }

  // 清空输入框值
  onDelete(){
    this.setState({
      keyword:'',
      editing:true,
      searching:false,
    });
    this.refs['input']._textInput.focus();
  }

  // 渲染推荐搜索列表
  renderRecom(){
    if(this.state.keyword){
      return (
        <ListItem button iconLeft onPress={this.onSearch}>
          <Icon name="search" style={{fontSize:18}} />
          <Text>{this.state.keyword}</Text>
        </ListItem>
      );
    }
    return;
  }

  // 渲染搜素结果
  renderBookList(){
    // 不在编辑或搜索状态并且有搜索结果了
    if (!this.state.editing && !this.state.searching && this.state.searchResult) {
      if(this.state.searchResult.bookList.length === 0){
        // 搜索结果中没有书籍
        return (
          <Animatable.View animation="zoomIn" style={styles.fastMailInfo}>
            <Image source={require('../img/sorry.png')} />
            <Text style={styles.resultTitle}>抱歉，没有查到你输入的书名</Text>
          </Animatable.View>
        );
      }
      return (
        <List
          dataArray={this.state.searchResult.bookList}
          renderRow={this.renderRow}>
        </List>
      );
    }
    return;
  }

  renderRow(item){
    console.log('renderRow');
    const cover = item.cover ? item.cover : Config.library.cover;
    return (
      <ListItem style={styles.bookItem}>
        <Thumbnail square source={{uri:cover}} style={styles.thumbnail}></Thumbnail>
        <Text numberOfLines={1}>{item.name}</Text>
        <Text note numberOfLines={1}>{item.author}</Text>
        <Text note numberOfLines={1}>{item.publiser}</Text>
        <Text note numberOfLines={1} style={styles.callNumber}>索书号:{item.number}</Text>
      </ListItem>
    );
  }

  renderLoading(){
    console.log('renderLoading');
    return (
      <View>
        <Spinner color="#039BE5" />
      </View>
    );
  }

  renderRecom2(){
    console.log('render recom2');
    return (
      <View>
        <List>
          { this.renderRecom() }
          <ListItem button iconLeft>
            <Icon name="search" style={{fontSize:18}} />
            <Text>高级搜索</Text>
          </ListItem>
        </List>
      </View>
    );
  }

  render(){
    return(
      <Container style={styles.container} theme={Theme}>
        <Header searchBar rounded>
          <InputGroup>
            <Icon name="arrow-left" onPress={this.onReturn} style={{fontSize:21}} />
            <Input
              ref="input"
              placeholder='输入书籍名'
              autoFocus={true}
              value={this.state.keyword}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSearch}
            />
            <Icon name="times" onPress={this.onDelete} />
          </InputGroup>
          <Button transparent>搜索</Button>
        </Header>
        { this.state.searching ? this.renderLoading() : null }
        { this.state.editing ? this.renderRecom2() : null }
        <Content>
          { this.renderBookList() }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'
  },
  thumbnail:{
    width:80,
    height:95
  },
  callNumber:{
    flex:1,
    justifyContent:'flex-end',
    textAlignVertical:'bottom',
    fontSize:15,
    color:'#336699'
  },
  bookItem:{
    height:113,// 高度113由thumbnail高度95+listItemPadding*2得到
  },
  resultTitle: {
    color: '#cccccc'
  },
  fastMailInfo: {
    'marginTop': 20,
    'justifyContent': 'center',
    'alignItems': 'center',
  },
  inputgroup: {
    backgroundColor: 'transparent',
    borderRadius: 2,
    borderColor: 'transparent',
    elevation: 2,
  }
});