import React from 'react';
import NumberFormat from 'react-number-format';

class UDNumberMask extends React.Component {
  render() {
    return (
      <NumberFormat format={this.props.format}
        mask={this.props.mask}
        thousandSeparator={this.props.thousandSeparator}
        prefix={this.props.prefix}
        placeholder={this.props.placeholder}
        displayType={this.props.displayType}
        value={this.props.value}
      />
    )
  }
}

export default UDNumberMask
