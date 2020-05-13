import React, { PureComponent } from 'react';
import { Chart } from 'react-charts';
import clsn from 'classnames';
import style from './index.scss';
import LineIcon from '../../assets/line_chart.svg';
import BarIcon from '../../assets/bar_chart.svg';
import Select from '../Select';

const formatData = (x, y, data) => {
  if (!x || !y || !data || !data.length) return [];
  const result = [];
  data.forEach((e) => {
    const _x = e[x];
    const _y = e[y];
    result.push({
      x: _x,
      y: _y,
    });
  });
  console.log('formatData -> result', result);
  return result;
};

class Charts extends PureComponent {
  data = []

  constructor(props) {
    super(props);
    this.state = {
      axes: [],
      series: { type: '' },
      x: '',
      y: '',
      chartComponent: null,
    };
  }

    changeChartType = (value = 'line') => {
      this.setState({
        series: { type: value },
      });
    }

    generate = ({ data = [] }) => {
      if (!data.length) return;
      const axes = [
        { primary: true, type: 'ordinal', position: 'bottom' },
        { type: 'linear', position: 'left' },
      ];
      const { series = { type: 'line' } } = this.state || {};
      this.setState({
        axes,
        chartComponent: (
          <Chart
            data={[{ data }]}
            series={series}
            axes={axes}
            tooltip
          />
        ),
      });
    }

    render() {
      const { getData = () => {} } = this.props || {};
      this.data = getData() || [];
      const { x = '', y = '', axes = [], series = {}, chartComponent = null } = this.state || {};
      const sample = this.data[0] || {};
      const xaxis = Object.keys(sample);
      const yaxis = Object.keys(this.data[0]).filter((k) => typeof sample[k] === 'number');
      const withData = this.data && this.data.length;
      const formated = formatData(x, y, this.data) || [];
      return (
        <>
          {
            withData ? (
              <div className="charts">
                <style jsx>{style}</style>
                <div className="left">
                  <div>Select X-axis Column</div>
                  <Select width={150} placeHolder="Select ..." options={xaxis} value={x} onChange={(value) => { this.setState({ x: value }); }} />
                  <div>Select Y-axis Column</div>
                  <Select width={150} placeHolder="Select ..." options={yaxis} value={y} onChange={(value) => { this.setState({ y: value }); }} />
                  <div>Charts Type</div>
                  <div className="flex">
                    <div className={clsn('chart-svg', { active: series.type === 'line' })} onClick={() => { this.changeChartType('line'); }}>
                      <LineIcon />
                    </div>
                    <div className={clsn('chart-svg', { active: series.type === 'bar' })} onClick={() => { this.changeChartType('bar'); }}>
                      <BarIcon />
                    </div>
                  </div>
                  <div className="btn-primary" onClick={() => { this.generate({ data: formated, series, axes }); }}>Generate</div>
                </div>
                <div className="charts-container">
                  {chartComponent}
                </div>
              </div>
            ) : <div style={{ height: '400px' }}>Please select data first !</div>
          }
        </>
      );
    }
}

export default Charts;
