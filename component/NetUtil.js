import React,{ Component } from 'react';
import { ToastAndroid } from 'react-native';

export default class NetUtil extends Component {
  // POST表单请求
  static postForm(url, data, callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    };

    fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        callback(JSON.parse(responseText));
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  // POST JSON请求
  static postJson(url, data, callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url,fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        callback(JSON.parse(responseText));
      })
      .catch((error) => {
        callback({text:'网络有问题，请稍后重试'});
        console.warn(error);
      }).done();
  }

  // GET请求
  static get(url, callback) {
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        callback(JSON.parse(responseText));
      }).done();
  }

}