import React, { PureComponent } from 'react';
import clsn from 'classnames';
import style from './index.scss';
import Tree from './Tree';
import Modal from '../Modal';
import Form from '../Form';

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isModalVisible: false,
    };
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  }

  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  }

  setSearch = (value) => {
    this.setState({
      search: value,
    });
  }

  handleRefreshClick = () => {
    // TODO: this.store.schema.refresh()
  }

  render() {
    const { darkTheme = true } = this.props || {};
    const { search = '', isModalVisible = false } = this.state || {};
    return (
      <>
        <Modal width="400" visible={isModalVisible} onClose={this.closeModal}>
          <Form />
        </Modal>
        <div className={clsn('sidebar', darkTheme ? 'dark' : 'light')}>
          <style jsx>{style}</style>
          <div className="new">
            New Instance
            <span className="plus" onClick={this.showModal}>+</span>
          </div>
          <div className="toolbar">
            <div className="search-wrapper">
              <input className="search" value={search} placeholder="Search schema" onChange={(event) => this.setSearch(event.target.value)} />
              <div className="icon">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                  <path d="M432 96C617.568 96 768 246.432 768 432c0 81.408-28.96 156.064-77.12 214.208l0.736 0.512 3.008 2.656 181.024 181.024a32 32 0 0 1-42.24 47.904l-3.008-2.656-181.024-181.024a32.256 32.256 0 0 1-3.2-3.744A334.496 334.496 0 0 1 432 768C246.432 768 96 617.568 96 432S246.432 96 432 96z m0 64a272 272 0 0 0 0 544 270.4 270.4 0 0 0 165.152-55.872l8.192-6.528 19.872-16.512 16.384-19.712a270.432 270.432 0 0 0 62.208-162.688L704 432A272 272 0 0 0 432 160z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="refresh-btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7558 4.08789L16.6542 4.94922C15.1522 3.0293 12.8163 1.79688 10.1933 1.79688C5.66396 1.79688 1.99795 5.45898 1.99209 9.99023C1.98623 14.5254 5.66006 18.2031 10.1933 18.2031C13.7343 18.2031 16.7519 15.957 17.9003 12.8105C17.9296 12.7285 17.8866 12.6367 17.8046 12.6094L16.6972 12.2285C16.6586 12.2153 16.6163 12.2177 16.5794 12.2352C16.5426 12.2527 16.514 12.284 16.4999 12.3223C16.4647 12.4199 16.4257 12.5176 16.3847 12.6133C16.0468 13.4141 15.5624 14.1328 14.9452 14.75C14.333 15.3634 13.6082 15.8528 12.8104 16.1914C11.9843 16.541 11.1034 16.7188 10.1972 16.7188C9.28896 16.7188 8.41006 16.541 7.58388 16.1914C6.7854 15.8542 6.06029 15.3646 5.44912 14.75C4.83525 14.1379 4.34635 13.4121 4.00967 12.6133C3.66006 11.7852 3.48232 10.9062 3.48232 9.99805C3.48232 9.08984 3.66006 8.21094 4.00967 7.38281C4.34756 6.58203 4.83193 5.86328 5.44912 5.24609C6.06631 4.62891 6.78506 4.14453 7.58388 3.80469C8.41006 3.45508 9.29091 3.27734 10.1972 3.27734C11.1054 3.27734 11.9843 3.45508 12.8104 3.80469C13.6089 4.14188 14.334 4.63148 14.9452 5.24609C15.1386 5.43945 15.3202 5.64453 15.4882 5.85938L14.3124 6.77734C14.2891 6.79534 14.2714 6.81954 14.2613 6.84715C14.2512 6.87477 14.2491 6.90468 14.2552 6.93345C14.2613 6.96222 14.2754 6.98867 14.2959 7.00977C14.3164 7.03088 14.3424 7.04577 14.371 7.05273L17.8007 7.89258C17.8983 7.91602 17.994 7.8418 17.994 7.74219L18.0097 4.20898C18.0077 4.08008 17.8573 4.00781 17.7558 4.08789Z" fill="currentColor" />
              </svg>
            </div>
          </div>
          <Tree />
        </div>
      </>
    );
  }
}

export default Sidebar;
