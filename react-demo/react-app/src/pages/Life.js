import React, { Component } from 'react'
import Child from './Child'
class Life extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  handleAdd = () => {
    this.setState({ count: this.state.count + 1 })
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>react生命周期</h2>
        <p onClick={this.handleAdd}><button>加1</button></p>
        <p onClick={this.handleClick.bind(this)}><button>加1</button></p>
        <h1>{this.state.count}</h1>
        <Child name={this.state.count}></Child>
      </div>
    )
  }
}
export default Life
