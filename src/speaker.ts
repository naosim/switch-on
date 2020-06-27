import Vue from 'vue/dist/vue.js';
import { Answers } from "./ts/domain/speaker/Answers";
import { SwitchOnSpeaker } from "./ts/domain/speaker/SwitchOnSpeaker";
import { WebSocketIn } from "./ts/websocket/WebSocketIn";
import { SwitchOnWebSocketImpl } from "./ts/websocket/SwitchOnWebSocketImpl";
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
    answers: new Answers()
  },
  methods: {
    pressCreateRoomButton: function() {
      console.log(this.apiKeyInput, this.channelInput);
      var webSocketIn = new WebSocketIn(this.channelInput, this.apiKeyInput);
      switchOnSpeaker = new SwitchOnSpeaker(new SwitchOnWebSocketImpl(webSocketIn.url))
      this.apiKey = webSocketIn.apiKey;
      this.channel = webSocketIn.channel;
      this.answers = switchOnSpeaker.answers;
      switchOnSpeaker.openWebSocket();
      this.isInRoom = true;
      this.audienceUrl = `${location.origin}${location.pathname.split('speaker').join('audience')}?ws=${encodeURIComponent(webSocketIn.url)}`
    },
    pressclearButton: function() {
      switchOnSpeaker.clearAnswers()
    },
    
  }
})

console.log(new WebSocketIn('1', 'g7qE0EtTIkvj4LxlM71jGCOlMRpd0Rl6PZxLsoDetByzU3uP3RgmAmvxgctx').url)