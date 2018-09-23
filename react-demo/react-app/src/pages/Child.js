import React, { Component } from 'react'
class Child extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentWillMount = () => {
    console.log('will mount');
  }

  componentDidMount = () => {
    console.log('did mount');
  }

  // 装配了的组件接收到新属性前调用,父组件的state通过调用setState方法的时候调用
  componentWillReceiveProps = (nextProps) => {
    console.log('will prpos', nextProps);
  }

  // 重新渲染过程开始前触发
  shouldComponentUpdate = () => {
    console.log('should update');
    return true;
  }

  componentWillUpdate = () => {
    console.log('will update');
  }

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    )
  }
}
export default Child
