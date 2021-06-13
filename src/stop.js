import React,{Component} from 'react';
import './stop.css';
import web3 from './web3';
import myProject from './abiandaddress';

class stop extends Component{
  constructor(props){
    super(props);
    this.state = {f:false,carid:'',bids:[], phnos:[]}
  }

  caridChangedHandler = (event)=>{
    this.setState({carid:event.target.value});
  }

  formSubmitHandler = async (event)=>{
  	event.preventDefault();
  	const accounts = await web3.eth.getAccounts();
  	let car = await myProject.methods.cars(this.state.carid).call();
    let phs=[];
    let b=[];
  	if(car.stop){
  		alert('Bidding for this car has already been stopped!');
    }
    else if(car.seller !== accounts[0]){
    	alert('You are not the seller of the carid: ' + this.state.carid);
    }
    else{
    	await myProject.methods.stopBid(this.state.carid).send({from: accounts[0]});
      b=await myProject.methods.getbids(this.state.carid).call();
      phs= await myProject.methods.getphnobidders(this.state.carid).call();
      this.setState({f:true,bids:b,phnos:phs});
    }
  }

  render(){

    if(this.state.f === true){
      return (
        <div>
          <table>
            <tr>
              <th>Value(in Wei)</th>
              <th>Contact No.</th>
            </tr>
            <tr>
              <td>
                {this.state.bids.map((b) => <h6>{b}</h6>)}
              </td>
              <td>
                {this.state.phnos.map((p)=> <h6>{p}</h6>)}
              </td>
            </tr>
          </table>
        </div>
      );
    }

  	return (
  		<div>
  			<div>This page is to be accessed only by the users who have active ads!</div>
  			<div className="warning">Note: once the Bid is stopped it cannot be undone!</div>
  			<form onSubmit={this.formSubmitHandler}>
  				<h3>Stop Bid:</h3>

  				<div className="carid-text-box">
                	<label>CarID: </label>
                	<input type="number" onChange={this.caridChangedHandler} value={this.state.carid} placeholder="1234" required/>
              	</div>

              	<button type="submit">Submit</button>

  			</form>
  		</div>
  	);
  }
}

export default stop;