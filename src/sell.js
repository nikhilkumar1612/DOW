import React,{Component} from 'react';
import './sell.css';
import web3 from './web3';
import myProject from './abiandaddress';

class sell extends Component{
  constructor(props){
    super(props);
    this.state={value : ''};
  }


  formChangedHandler = (event)=>{
    this.setState({value:event.target.value})
  }

  formSubmitHandler = async (event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    await myProject.methods.postAd(this.state.value).send({from: accounts[0]});
  }

  render(){
    return (
      <div>
        <p>Post a request our car inspectors will contact you ASAP!</p>
        <form onSubmit={this.formSubmitHandler}>
          <div className="login-box">
            <h2>Post Request :</h2>
            <div className="text-box">
                <i class="fa fa-phone"></i>
                <input type="text" onChange={this.formChangedHandler} value={this.state.value} placeholder="1234567890" pattern="[0-9]{10}" required/>
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default sell;