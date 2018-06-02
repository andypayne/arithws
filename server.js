const WebSocket = require('ws')
require('dotenv').config()

const WS_PORT = process.env.WS_PORT || 8080

const wss = new WebSocket.Server({ port: WS_PORT })
console.log('arithws listening on port: ' + WS_PORT)

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log('request: %s', msg)
    ws.send(doArith(msg))
  })

  ws.send('arithws')
})


let doArith = (str) => {
  // Binary ops only for now
  let toks = str.match(/\s*([+-]?\d*\.?\d+)\s*([^\s\d]+)\s*([+-]?\d*\.?\d+)\s*/)
  if (toks) {
    let l  = parseFloat(toks[1])
    let op = toks[2]
    let r  = parseFloat(toks[3])
    console.log('parsed = ', l, op, r)
    switch(op) {
      case '+':
        return l + r
      case '-':
        return l - r
      case '*':
        return l * r
      case '/':
        return l / r
      case '%':
        return l % r
      case '**':
        return l ** r
      case '^':
        return l ^ r
      case '<<':
        return l << r
      case '>>':
        return l >> r
      case '&':
        return l & r
      case '|':
        return l | r
      default:
        console.log('Unrecognized op: ' + op)
    }
  }

  return ""
}

