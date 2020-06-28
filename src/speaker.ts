import Vue from 'vue/dist/vue.js';
import { Answers } from "./ts/domain/speaker/Answers";
import { SwitchOnSpeaker } from "./ts/domain/speaker/SwitchOnSpeaker";
import { WebSocketIn } from "./ts/websocket/WebSocketIn";
import { SwitchOnWebSocketImpl, LoadingStatus, WebSocketStatus } from "./ts/websocket/SwitchOnWebSocketImpl";
import { getQuery } from './util';


var switchOnSpeaker: SwitchOnSpeaker
var app = new Vue({
  el: '#app',
  data: {
    apiKey: getQuery('apikey'),
    channel: getQuery('channel'),
    apiKeyInput: getQuery('apikey'),
    channelInput: getQuery('channel'),
    websocketin: new WebSocketIn('1', 'g7qE0EtTIkvj4LxlM71jGCOlMRpd0Rl6PZxLsoDetByzU3uP3RgmAmvxgctx'),
    isInRoom: false,
    audienceUrl: null,
    answers: new Answers(),
    isPointVisible: true,
    webSocketStatus: new WebSocketStatus(),
  },
  methods: {
    pressCreateRoomButton: function() {
      console.log(this.apiKeyInput, this.channelInput);
      var webSocketIn = new WebSocketIn(this.channelInput, this.apiKeyInput);
      this.apiKey = webSocketIn.apiKey;
      this.channel = webSocketIn.channel;
      if(this.apiKey && this.apiKey.length > 0 && this.channel && this.channel.length > 0) {
        var switchOnWebSocketImpl = new SwitchOnWebSocketImpl(webSocketIn.url, true, new LoadingStatus(), this.webSocketStatus);
        switchOnSpeaker = new SwitchOnSpeaker(switchOnWebSocketImpl)
        this.answers = switchOnSpeaker.answers;
        switchOnSpeaker.openWebSocket((e) => {
          if(e) {
            return;
          }
          this.isInRoom = true;
          this.audienceUrl = `${location.origin}${location.pathname.split('speaker').join('audience')}?ws=${encodeURIComponent(webSocketIn.url)}`
        });
      }
    },
    pressclearButton: function() {
      switchOnSpeaker.clearAnswers()
    },
    pointVisibleTrue() {
      this.isPointVisible = true;
    },
    pointVisibleFalse() {
      this.isPointVisible = false;
    }
  }
})

console.log(new WebSocketIn('1', 'g7qE0EtTIkvj4LxlM71jGCOlMRpd0Rl6PZxLsoDetByzU3uP3RgmAmvxgctx').url)