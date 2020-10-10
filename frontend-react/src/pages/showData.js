import React, {Component} from "react";
import {Table} from "react-bootstrap";
import {getDataApi} from "../Api";

class ShowData extends Component{
  state = {
    data: []
  }
  componentDidMount() {
    getDataApi(localStorage.email, localStorage.accessToken).then(data=>{
      console.log("reached here", data)
      this.setState({
        data: data
      })
    })
  }

  render() {
    if (this.state.data.length) {
      return (
        <div>
          <Table striped bordered hover variant='dark'>
            <thead>
            <tr>
              <th>Id</th>
              <th>UserId</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.data.map(value => {
                return (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.userId}</td>
                    <td>{value.title}</td>
                    <td>{value.body}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
        </div>)
    }
    else{
      return <h1 className='panel-title'>Loading</h1>
    }
  }
}

export default ShowData
