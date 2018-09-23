import React, { Component } from 'react'
import Child from './Child'
import './Life.less'
import { Button, Table, Divider, Tag } from 'antd'
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

class Life extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  columns = () => {
    return [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    }];
  }

  handleAdd = () => {
    this.setState({ count: this.state.count + 1 })
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <div className="content">
        <h2>react生命周期</h2>
        <p onClick={this.handleAdd}><Button type="primary">加1</Button></p>
        <p onClick={this.handleClick.bind(this)}><button>加1</button></p>
        <h1>{this.state.count}</h1>
        <Child name={this.state.count}></Child>
        <Table columns={this.columns()} dataSource={data} />
      </div>
    )
  }
}
export default Life
