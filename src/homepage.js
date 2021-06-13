import React,{Component} from 'react';

class homepage extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <p> best place to buy and sell cars </p>
        <br/>
        <br/>
        <h2>What is on your mind today ? </h2>
        <p>learn how we work <a href="t&c.pdf" download="dow_t&c"><i class="fa fa-download" aria-hidden="true"></i></a></p>
        <a href="/buy"><button>BUY</button></a>
        <br/>
        <br/>
        <a href="/sell"><button>SELL</button></a>
      </div>
    );
  }
}

export default homepage;