# @gatehub/ethmonitor

Ethereum node monitor

## About

Ethereum node health checker and metrics exporter

- Health checker listens on port 3000

## Usage

```
export ETH_NODE_URL=https://parity-etc.gatehub.net
npm run start
curl localhost:3000
```

### Config options

- `ETH_NODE_URL`: url of web3 rpc api
- `ETH_LAST_BLOCK_SPAN`: span for last block
