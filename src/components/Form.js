import React,{Component} from 'react';
import Axios from 'axios';
import {Button} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

      handleChange(event) {
        this.setState({URLvalue: event.target.value});
      }

      handleSubmit(event) {
            event.preventDefault();
            Axios.post('/createnewURL',{URLvalue: this.state.URLvalue}).then(res => this.setState({shortURL: "http://localhost:3000/" + res.data})).catch(error => {});
        }
        

    render()
    {
        return(
            <div style={{backgroundColor: "lightblue"}}>
                <h1 style={{textAlign:"center", fontFamily: "sans-serif", backgroundColor: "lightBlue"}}>Form for Shortening URLs...</h1>
                    <form style={{textAlign: "center"}} onSubmit={this.handleSubmit} >
                    <label>
                        Enter URL: 
                        <input type="text" name="name" placeholder="Insert your URL..." onChange={this.handleChange}/>
                    </label>
                    <Button variant="raised" color="secondary"><input type="submit" value="Submit"  /></Button>
                    </form>
                    {this.state.URLvalue} <br>
                    </br>
                    <br>
                    </br>
                    <a href={this.state.shortURL}>{this.state.shortURL}</a>
                    
             </div>
             
    
        )
    }
    
}
    

export default Form;