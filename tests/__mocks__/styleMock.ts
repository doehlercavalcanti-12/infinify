const proxy = new Proxy(
  {},
  {
    get: (_target, property) => (typeof property === 'string' ? property : '')
  }
);

export default proxy;
