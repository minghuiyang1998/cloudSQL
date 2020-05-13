import React, { PureComponent } from 'react';
import style from './index.scss';
import LineIcon from '../../assets/line_chart.svg';
import BarIcon from '../../assets/bar_chart.svg';
import Select from '../Select';

class Charts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chart: '',
    };
  }

  render() {
    return (
      <div className="charts">
        <style jsx>{style}</style>
        <div className="left">
          <div>Select X-axis Column</div>
          <Select />
          <div>Select Y-axis Column</div>
          <Select />
          <div>Charts Type</div>
          <div className="flex">
            <LineIcon />
            <BarIcon />
          </div>
        </div>
        <div className="charts-container" />
      </div>
    );
  }
}

export default Charts;
