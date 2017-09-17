import React, { Component } from 'react';
import Modal from 'react-modal';
import { Session } from 'meteor/session';
import ShopDetail from '../components/profile/ShopDetail';
import { Tracker } from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {ShopApi} from '../../api/shop';
import { CityApi } from '../../api/city';
import { StateApi } from '../../api/state';

export default class ShopPage  extends Component {
  constructor() {
    super();
    this.state = {
    modalIsOpen: false,
    states:[],
    cityies:[],
    shops:[],
  }

    this.openModal = this.openModal.bind(this);
     this.afterOpenModal = this.afterOpenModal.bind(this);
     this.closeModal = this.closeModal.bind(this);

  }
  componentDidMount(){
    Tracker.autorun(() => {
      Meteor.subscribe('shop');
      Meteor.subscribe('state');
      Meteor.subscribe('city');
      const Shop= ShopApi.find().fetch();
      const State= StateApi.find().fetch();
      const City= CityApi.find().fetch();
      this.setState({
        shops:Shop,
        states:State,
        cityies:City,
      });
      }
    )
  }


  openModal() {
   this.setState({modalIsOpen: true});
 }

 afterOpenModal() {
 }

 closeModal() {
   this.setState({modalIsOpen: false});
 }
  render(){
    return(
       <div>
       <div style={{display:'flex',flex:1,justifyContent:'flex-end'}} className="produclistbox">
       <button onClick={this.openModal}  className="btn btn-primary">+New</button>
       </div>
       <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         contentLabel="Example Modal"
       >
       <div style={{display:'flex',flex:1,justifyContent:'flex-end',margin:5}}>
       <button onClick={this.closeModal} className='btn btn-danger btn-sm' style={{borderRadius:50}}><span className="glyphicon glyphicon-remove"></span></button>
       </div>
       <ShopDetail states={this.state.states} city={this.state.cityies}  />
       </Modal>
        {
          this.state.shops.map((shop,i)=><ShopSingleItem key={i} shop={shop} />)
        }
       </div>
    );
  }
}
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-30%',
    width                 :  '50%',
    transform             : 'translate(-50%, -50%)',
    border                : '1px solid black',
  }
};


class ShopSingleItem  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div>
       <div style={{display:'flex',flex:1,alignItems:'center'}} className="produclistbox">
       <div>{this.props.shop.shopname}</div>
       <div>{this.props.shop.password}</div>
       <div>{this.props.shop.shopaddress}</div>
       </div>
       </div>
    );
  }
}
