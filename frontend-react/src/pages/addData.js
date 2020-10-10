import React, {Component} from "react";
import {Form} from "react-bootstrap";
import {Button} from "@rmwc/button";
import {addDataApi} from "../Api";
class AddData extends Component{
  handleClick = (e)=>{
    e.preventDefault()
    const item = document.getElementById('json-file')
    if (item.files[0]){
      let reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          console.log(data)
          addDataApi(data, localStorage.email, localStorage.accessToken).then((data)=>alert(data.action))
        }
        catch (e) {
          alert('file selected is not json')
        }
      }
      reader.readAsText(item.files[0])
    }
    else{
      alert('Please select a file to proceed')
    }

  }
  render() {
    return (
      <div id='loginForm'>
        <Form>
          <h1 className='text-center'>Data Upload</h1>
          <label htmlFor='json-file'>Select file to upload</label>
          <input
            id="json-file"
            type='file'
            className='input-group'
            accept="application/JSON"
            required
          />
          <Button style={{marginTop: '20px'}} type='submit' onClick={this.handleClick} raised>
            Upload
          </Button>
          </Form>
      </div>
    )
  }
}

export default AddData
