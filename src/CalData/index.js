function Packet(data) {
  return new Proxy(data, {
    get(target, prop) {
      if (target[prop] && target[prop].val) {
        const { val, get } = target[prop];
        if (get) {
          return get(val);
        }
        return val;
      }
      return target[prop];
    },

    set(target, prop, value) {
      if (target[prop] !== value) {
        target[prop].val = target[prop].set ? target[prop].set(value) : value;
        return true;
      }
      return false;
    },
  });
}

export default Packet;
