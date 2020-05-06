import { observable } from 'mobx';
import Store from './Store';

class SchemaStore extends Store {
  @observable schema = [];
}

export default SchemaStore;
