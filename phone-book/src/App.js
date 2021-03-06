import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state ={
    information: [
      {
        id:0,
        name: '박윤정',
        phone: '010-0000-0000'
      },
      {
        id:1,
        name:'홍길동',
        phone: '010-0000-0001'
      }
    ],
    keyword: ''
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({id:this.id++, ...data})
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      // 해당 아이디가 아닌 애들만 뽑아서 새로운 배열만듬
      information : information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          ? { ...info, ...data } // 새 객체 만들어서 기존의 값 전달받은 data 덮어씀
          : info // 기존의 값 유지
      )
    })
  }

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <p>
          <input 
            placeholder="검색 할 이름을 입력하세요.." 
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList 
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
