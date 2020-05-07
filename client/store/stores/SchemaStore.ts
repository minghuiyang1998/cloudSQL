import { observable } from 'mobx';
import Store from './Store';

class SchemaStore extends Store {
  @observable data = [];

  @observable loading = false;

  @observable error = '';
}

export default SchemaStore;
