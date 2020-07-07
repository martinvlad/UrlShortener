import React,{Component} from 'react';
import Axios from 'axios';
class Form  extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            URLvalue: '',
            shortURL: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
      }

      function (){
          Axios.get('/createnewURL?id=12345')
          .then((res)=> console.log(res))
      }

      handleSubmit(event) {
            event.preventDefault();
            Axios.post('/createnewURL',{URLvalue: this.state.URLvalue}).then(res => this.setState({shortURL: "http://localhost:3000/" + res.data}))
        }
        

    render()
    {
        return(
            <div>
                <h1 style={{textAlign:"center", fontFamily: "sans-serif"}}>Form for Shortening URLs</h1>
                    <form style={{textAlign: "center"}} onSubmit={this.handleSubmit}>
                    <label>
                        URL: 
                        <input type="text" name="name" placeholder="Insert your URL..." onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"  />
                    </form>
                    {this.state.shortURL}
             </div>
    
        )
    }
    
}
    

export default Form;