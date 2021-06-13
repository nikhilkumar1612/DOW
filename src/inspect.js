import React,{Component} from 'react';
import './inspect.css';
import web3 from './web3';
import myProject from './abiandaddress';
import ipfs from './ipfs';

class inspect extends Component{
  constructor(props){
    super(props);
    this.state = {flag: true, carid:'', baseprice:'', maxprice:'', image1:'', image2:'', image3:'', desc:'', image1hash:'',
                  image2hash:'', image3hash:''}
  }

  caridChangedHandler = (event)=>{
    this.setState({carid:event.target.value});
  }

  basepriceChangedHandler = (event)=>{
    this.setState({baseprice:event.target.value});
  }

  maxpriceChangedHandler = (event)=>{
    this.setState({maxprice:event.target.value});
  }

  image1ChangedHandler = (event)=>{
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = ()=>{
      this.setState({image1 : Buffer(reader.result)})
      ipfs.files.add(this.state.image1, (error, result)=>{
        if(error){
          console.log("error uploading image1 " + error);
          return;
        }
        this.setState({image1hash : result[0].hash});
        console.log(this.state.image1hash);
      })
    }
  }

  image2ChangedHandler = (event)=>{
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = ()=>{
      this.setState({image2 : Buffer(reader.result)})
      ipfs.files.add(this.state.image2, (error, result)=>{
        if(error){
          console.log("error uploading image2 " + error);
          return;
        }
        this.setState({image2hash : result[0].hash});
        console.log(this.state.image2hash);
      })
    }
  }

  image3ChangedHandler = (event)=>{
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = ()=>{
      this.setState({image3 : Buffer(reader.result)})
      ipfs.files.add(this.state.image3, (error, result)=>{
        if(error){
          console.log("error uploading image3 " + error);
          return;
        }
        this.setState({image3hash : result[0].hash});
        console.log(this.state.image3hash);
      })
    }
  }

  descChangedHandler = (event)=>{
    this.setState({desc:event.target.value});
  }



  formSubmitHandler = async (event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await myProject.methods.inspect(this.state.carid, this.state.baseprice, this.state.maxprice, this.state.desc, this.state.image1hash, 
                                    this.state.image2hash, this.state.image3hash).send({from: accounts[0]});
    
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const inspector = await myProject.methods.inspectors(accounts[0]).call();
    if(!inspector){
      alert('You are not the inspector of Smart Contract!\n You cannot access use any functions here');
      this.setState({flag : false});
    }
  }
formChangedHandler = (event)=>{
    this.setState({value:event.target.value})
  }

  render(){
    if(!this.state.flag){
      return(
        <div className="warning">
          Sorry you cannot access this page!
        </div>
      );
    }

    return (
      <div>
        <div>This page is to be accessed only by the inspectors of the Smart Contract!</div>
          <form onSubmit={this.formSubmitHandler}>
              <h3>Inspection Form :</h3>

              <div className="carid-text-box">
                <label>CarID: </label>
                <input type="number" onChange={this.caridChangedHandler} value={this.state.carid} placeholder="1234" required/>
              </div>

              <div className="baseprice-text-box">
                <label>Base Price: </label>
                <input type="number" onChange={this.basepriceChangedHandler} value={this.state.baseprice} placeholder="in Wei" required/>
              </div>

              <div className="maxprice-text-box">
                <label>Max Price: </label>
                <input type="number" onChange={this.maxpriceChangedHandler} value={this.state.maxprice} placeholder="in Wei" required/>
              </div>

              <div className="image-text-box">
                <label>Image 1 :</label>
                <input type="file" onChange={this.image1ChangedHandler} accept='image/*' required/>
              </div>

              <div className="image-text-box">
                <label>Image 2 :</label>
                <input type="file" onChange={this.image2ChangedHandler} accept='image/*' required/>
              </div>

              <div className="image-text-box">
                <label>Image 3 :</label>
                <input type="file" onChange={this.image3ChangedHandler} accept='image/*' required/>
              </div>

              <div className="cardesc-text-box">
                <label>Car Description:</label>
                <textarea type="text" onChange={this.descChangedHandler} value={this.state.desc} placeholder="Car details..." required/>
              </div>

              <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default inspect;