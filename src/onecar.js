import React,{Component} from 'react';
import './onecar.css';

class Onecar extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
        <tr>
          <td>{this.props.id}</td>
          <td>{this.props.phno}</td>
        </tr>
    );
  }
}

export default Onecar;