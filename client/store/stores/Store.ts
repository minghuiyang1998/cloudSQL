class Store {
  get(id: string) {
    return this.data.get(id);
  }

  set(id: string, value: any) {
    return this.data.set(id, value);
  }

  has(id: string) {
    return this.data.has(id);
  }
}

export default Store;
