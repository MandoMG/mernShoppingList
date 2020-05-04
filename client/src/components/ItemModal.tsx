import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import {
   Button,
   Form,
   FormGroup,
   Input,
   Label,
   Modal,
   ModalBody,
   ModalHeader,
} from 'reactstrap'
import { ShoppingListItem } from '../interfaces/ShoppingListItem';

interface ShoppingListProps {
   addItem(item: ShoppingListItem): any;
}

class ItemModal extends Component<ShoppingListProps> {
   state = {
      modal: false,
      name: ''
   }

   onChange = (e: any) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = (e: any) => {
      e.preventDefault();

      const newItem = {
         name: this.state.name
      }

      //Add Item through addItem action
      this.props.addItem(newItem);

      this.toggle();
   }

   toggle = () => {
      this.setState({
         modal: !this.state.modal
      })
   }

   render() {
      return (
         <div>
            <Button
               color="dark"
               style={{ marginBottom: '2rem' }}
               onClick={this.toggle}
            >Add Item</Button>
            <Modal
               isOpen={this.state.modal}
               toggle={this.toggle}
            >
               <ModalHeader toggle={this.toggle}> Add to Shopping List </ModalHeader>
               <ModalBody>
                  <Form onSubmit={this.onSubmit}>
                     <FormGroup>
                        <Label for="item">Item</Label>
                        <Input
                           type="text"
                           name="name"
                           id="item"
                           placeholder="Add shopping item"
                           onChange={this.onChange}
                        />
                        <Button
                           color="dark"
                           style={{ marginTop: '2rem' }}
                           block
                        >Add Item</Button>
                     </FormGroup>
                  </Form>
               </ModalBody>
            </Modal>
         </div>
      )
   }
}

const mapStateToProps = (state: any) => ({
   item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);