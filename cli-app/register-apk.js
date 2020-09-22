const {registerApk} = require('./dist/es/handlers/register-apk')

const config = {
  get: (key) => {
    if (key === 'services.wns') {
      return {
        server: 'https://wns1.kube.moon.dxos.network/api',
        userKey: '657af063bd13e7359904d3d935e9e9b8339fa4a5effc61690d28a79417eafe7f',
        bondId: 'bd43083744e7ff15380f38ec672be7715b343c7529e21128fb0ac12c23f015ea',
        chainId: 'devnet-2',
        gas: "200000",
        fees: "200000uwire"
      }
    }
    throw new Error(`No config for ${key}`)
  }
}

const getAppRecord = (config, namespace) => {
  const record = {
    ...config,
    type: 'wrn:app'
  };

  if (namespace) {
    record.tag = namespace;
  }

  return record;
};

const argv = {
  verbose: true,
  namespace: 'rzadp',
  name: ['wrn://rzadp/application/apk']
}

registerApk(config, {getAppRecord})(argv)
  .catch(console.error)
  .then(() => console.log('Done!'))
