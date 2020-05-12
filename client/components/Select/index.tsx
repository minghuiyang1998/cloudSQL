import React from 'react';
import Select from 'react-select';
import style from './index.scss';


const SelectWrapped = ({ defaultValue = '', options = [], onChange = () => {}, width = 280 }) => {
  const _defaultValue = { value: defaultValue, label: defaultValue };
  const _options = options.map((o) => ({ value: o, label: o }));
  const customStyle = {
    menu: (provided) => ({
      ...provided,
      margin: 0,
    }),
    control: (provided) => ({ ...provided, minHeight: 'none' }),
    indicatorsContainer: (provided) => ({ ...provided, padding: 0 }),
    container: (provided) => ({ ...provided, width }),
  };
  return (
    <>
      <style jsx>{style}</style>
      <Select
        className="select"
        defaultValue={_defaultValue}
        options={_options}
        onChange={({ value }) => { onChange(value); }}
        styles={customStyle}
      />
    </>
  );
};

export default SelectWrapped;
