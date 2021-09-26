import io from 'socket.io-client';

export const CONNECT = 'connection';
export const DISCONNECT = 'disconnect';
export const CHAT_MSG_IN = 'chat-msg-in';
export const CHAT_MSG_OUT = 'chat-msg-out';
export const JOIN_ROOM = 'add-topic';
export const TYPING = 'typing';
export const ADMIN_MSG = 'admin-msg';

const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3030'
export const socketService = createSocketService();

socketService.setup()


function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb=null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    }
  }
  return socketService
}



