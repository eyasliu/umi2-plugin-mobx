import _umiDynamic from 'umi/dynamic';
import { observable } from 'mobx'

const cached = {};

function registerStore(stores = []) {
  stores.map(store => {
    const { name, path } = store;
    console.log(name, path)
    if (!cached[name]) {
      observable(require(`${path}`).default)
      cached[name] = 1;
    }
  });
}
export default function dynamic(config) {
  const { stores, component: resolveComponent } = config;
  return _umiDynamic({
    async loader() {
      registerStore(stores);
      return () => resolveComponent();
    },
  });
}
