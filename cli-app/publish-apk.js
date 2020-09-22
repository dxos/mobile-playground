const {publish} = require('./dist/es/handlers/publish')

const config = {
  get: (key) => {
    if (key === 'services.ipfs.server') return 'https://apollo1.kube.moon.dxos.network/dxos/ipfs/api'
    throw new Error(`No config for ${key}`)
  }
}

publish(config)({path: '../ipfs-bundle'})
  .catch(console.error)
  .then(() => console.log('Done!'))
