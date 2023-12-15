import { socket, configureLicence } from '@octoguild-licence/client'
import config from '../config/settings'
import '@octoguild-licence/client/startup'

const prefix = 'SOCKET:'

if (config.licence) {
  configureLicence({
    app_id: config.licence.app_id,
    key: config.licence.key,
  })
}

// will create two distinct connections

socket.on('error', error => {
  // ...
  console.log(prefix, 'error', error)
})

socket.on('connect', () => {
  console.log(prefix, 'socket is opened')
})
socket.on('event', data => {
  console.log(prefix, 'message: ', data)
})
socket.on('test', data => {
  console.log(prefix, 'test: ', data)
})
socket.on('disconnect', () => {
  console.log(prefix, 'socket is closed ')
})
socket.on('connect_error', e => {
  // proxy errorMessage for better explanation
  // @ts-ignore
  console.log(prefix, 'connect_error', e?.description?.message || e.message)
})
socket.on('reconnect_attempt', () => {
  console.log(prefix, 'reconnect_attempt ')
  // socket.io.opts.query = {
  //   token: 'fgh'
  // }
})

export default socket
