import React,{Component} from 'react';
import './stop.css';
import web3 from './web3';
import myProject from './abiandaddress';

class bid extends Component{
  constructor(props){
    super(props);
    this.state = {carid:'', phno:'', price:''}
  }

  caridChangedHandler = (event)=>{
    this.setState({carid:event.target.value});
  }

  bidvalueChangedHandler = (event)=>{
    this.setState({price:event.target.value});
  }

  phnovalueChangedHandler = (event)=>{
    this.setState({phno:event.target.value});
  }



  formSubmitHandler = async (event)=>{
  	event.preventDefault();
  	const accounts = await web3.eth.getAccounts();
  	let car = await myProject.methods.cars(this.state.carid).call();
    let p=parseInt(this.state.price);
    let m=parseInt(car.maxPrice);
    let b=parseInt(car.basePrice);
  	if(car.stop){
  		alert('Bidding for this car has already been stopped!');
    }
    else if(car.seller === accounts[0]){
    	alert('You cannot bid on your own car!');
    }
    else if(p <= b){
      alert('price less than base price, cannot place bid');
    }
    else if(p > m){
      alert('price greater than max price, cannot place bid');
    }
    else{
    	await myProject.methods.bid(this.state.carid, this.state.price, this.state.phno).send({from: accounts[0]});
    }
  }

  render(){
  	return (
  		<div>
  			<form onSubmit={this.formSubmitHandler}>
  				<h3>Place Bid:</h3>

  				<div className="carid-text-box">
            <label>CarID: </label>
            <input type="number" onChange={this.caridChangedHandler} value={this.state.carid} placeholder="1234" required/>
          </div>

          <div className="bid-text-box">
            <label>Bid Value: </label>
            <input type="text" onChange={this.bidvalueChangedHandler} value={this.state.price} placeholder="in Wei" required/>
          </div>

          <div className="ph-text-box">
            <i class="fa fa-phone">:</i>
            <input type="text" onChange={this.phnovalueChangedHandler} value={this.state.phno} placeholder="1234567890" pattern="[0-9]{10}" required/>
          </div>



          <button type="submit">Submit</button>

  			</form>
  		</div>
  	);
  }
}

export default bid;