import React,{ Component } from 'react';
import { StyleSheet,View,TouchableOpacity,ScrollView,TextInput,Image,ListView,Dimensions } from 'react-native';
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

export default class Library extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      keyword:'',
      editing:true,
      searching:false,
      books:null,
      lastId:'' // 存储当前页最后一本书的id
    };
    
    // 测试-搜索列表展示页面
    /*
    this.state = {
      keyword:'html',
      editing:false,
      searching:false,
      books:TestData.books,
      lastId:'' // 存储当前页最后一本书的id
    };
    */

    this.renderRow = this.renderRow.bind(this);

    this.onReturn = this.onReturn.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
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
      lastId: '',
    });
  }

  // 搜索
  onSearch(){
    DismissKeyboard();
    this.setState({
      searching:true,
      editing:false,
    })
    let data = {
      keyword: this.state.keyword,
      lastId: this.state.lastId ? this.state.lastId : ''
    };
    // console.log(data);
    // 实际用
    
    NetUtil.postJson(Config.api.library,data,(res)=>{
      this.setState({
        books:res.books,
        searching:false,
        lastId:res.books[res.books.length-1]._id,
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

  // 当搜索结果滚动视图滚动到接近底部时
  onEndReached(){
    console.log('到底了');
    /*
    let data = {
      keyword: this.state.keyword,
      lastId: this.state.lastId ? this.state.lastId : ''
    };
    console.log(data);
    NetUtil.postJson(Config.api.library,data,(res)=>{
      this.setState({
        books:res.books,
        searching:false,
        lastId:res.books[res.books.length-1]._id,
      });
    });
    */
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

  // 渲染搜索结果
  renderBookList(){
    // console.log(this.state.searchResult,this.state.lastId);
    // 不在编辑或搜索状态并且有搜索结果了
    if (!this.state.editing && !this.state.searching && this.state.books) {
      if(this.state.books.length === 0){
        // 搜索结果中没有书籍
        return (
          <Animatable.View animation="zoomIn" style={styles.fastMailInfo}>
            <Image source={require('../img/sorry.png')} />
            <Text style={styles.resultTitle}>抱歉，没有查到你输入的书名</Text>
          </Animatable.View>
        );
      }
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      const dataSource = ds.cloneWithRows(this.state.books);
      const h = Dimensions.get('window').height - 70;
      return (
        <ListView style={{height:h}}
          keyboardDismissMode={'on-drag'}
          initialListSize={5} // 组件刚挂载时只渲染5行
          onEndReachedThreshold={200} // 距离底部200像素时触发
          onEndReached={this.onEndReached}
          dataSource={dataSource}
          renderRow={this.renderRow}>
        </ListView>
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
    // console.log('render recom2');
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
        <View>
          { this.renderBookList() }
        </View>
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