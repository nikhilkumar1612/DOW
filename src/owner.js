import React,{Component} from 'react';
import './owner.css';
import web3 from './web3';
import myProject from './abiandaddress';

class owner extends Component{
  constructor(props){
    super(props);
    this.state = {addr : '', flag : true}
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const owner = await myProject.methods.owner().call();
    if(accounts[0] !== owner){
      this.setState({addr : '', flag : false});
      alert('You are not the owner of Smart Contract!\n You cannot access use any functions here');
    }
  }

  formChangedHandler = (event)=>{
    this.setState({addr:event.target.value});
  }

  formSubmitHandler = async (event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await myProject.methods.inspectorAddRemove(this.state.addr).send({from: accounts[0]});
  }


  render(){
    if(!this.state.flag){
      return(
        <div className="warning">
          Sorry You Cannot Access this Page!
        </div>
      )
    }
    return (
      <div>
      <div>This page is to be accessed only by the owner of the Smart Contract!</div>
        <form onSubmit={this.formSubmitHandler}>
          <div className="login-box">
            <h3>Add/Remove Inspector :</h3>
            <div className="text-box">
                <label>Address:</label>
                <input type="text" onChange={this.formChangedHandler} value={this.state.value} placeholder=
                "0x0000000000000000000000000000000000000000" required/>
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default owner;