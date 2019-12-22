import React from 'react';
import NumberFormat from 'react-number-format';
class UDNumberMask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      displayType: 'input',
      isNumericString: true,
      format: this.props.format,
      mask: this.props.mask,
      placeholder: this.props.placeholder,
      hidden: false
    }
  }

  componentWillMount() {
    this.pubSubToken = PubSub.subscribe(this.props.id, this.onIncomingEvent.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubSubToken);
  }

  onIncomingEvent(eventName, event) {
    if (event.type === "requestState") {
      var data = {
        attributes: {
          value: this.state.value
        }
      }
      UniversalDashboard.post('/api/internal/component/element/sessionState/${event.requestId}', data);
    }
    else if (event.type === "setState") {
      this.setState(event.state.attributes);
    }
    else if (event.type === "clearElement") {
      this.setState({
        value: null
      });
    }
    else if (event.type === "removeElement") {
      this.setState({
        hidden: true
      });
    }
  }

  render() {

    if (this.state.hidden) {
      return null;
    }
    return (
      <NumberFormat getInputRef={(el) => this.inputElem = el}
        format={this.state.format}
        mask={this.state.mask}
        placeholder={this.state.placeholder}
        value={this.state.value}
        onValueChange={(values) => {
          const { formattedValue, value } = values;
          this.setState({ value: formattedValue })
        }}
      />
    )
  }
}
export default UDNumberMask
