import Vue from 'vue/dist/vue.js';
import { SwitchOnAudience } from "./ts/domain/audience/SwitchOnAudience";
import { SwitchOnWebSocketImpl, LoadingStatus, WebSocketStatus } from "./ts/websocket/SwitchOnWebSocketImpl";


function getWebSocketUrl() {
  if(location.search.indexOf('?') != 0) {
    return null;
  }
  var kvList = location.search.split('?')[1].split('#')[0].split('?');
  var prefix = 'ws=';
  var oneAry = kvList.filter(v => v.indexOf(prefix) == 0);
  if(oneAry.length != 1) {
    return null;
  }
  return decodeURIComponent(oneAry[0].slice(prefix.length));
}
console.log(getWebSocketUrl());

var switchOnAudience: SwitchOnAudience
var app = new Vue({
  el: '#app',
  data: {
    webSocketUrl: getWebSocketUrl(),
    isInRoom: false,
    loadingStatus: new LoadingStatus(),
    webSocketStatus: new WebSocketStatus()
  },
  methods: {
    pressCreateRoomButton: function() {
      console.log('pressed');
      if(!this.webSocketUrl) {
        throw 'webSocketのURLが不明です'
      }
      switchOnAudience = new SwitchOnAudience(new SwitchOnWebSocketImpl(this.webSocketUrl, false, this.loadingStatus, this.webSocketStatus))
      switchOnAudience.openWebSocket((e) => {
        if(e) {
          // alert('サーバ接続に失敗しました。もう一度試してください。')
          return;
        }
        this.isInRoom = true;
      });
    },
    pressYesButton: function() {
      switchOnAudience.yes();
    },
    pressNoButton: function() {
      switchOnAudience.no();
    }
  }
})
window['app'] = app;