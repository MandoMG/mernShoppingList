import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, checkItem } from '../actions/itemActions';
import { ShoppingListItem } from '../interfaces/ShoppingListItem';

interface ShoppingListState {
   items: ShoppingListItem[];
}

interface ShoppingListProps {
   item: ShoppingListState;
   checkItem(updatedItem: ShoppingListItem, id?: string): any;
   deleteItem(id?: string): any;
   getItems(): any;
}

class ShoppingList extends Component<ShoppingListProps> {
   componentDidMount() {
      this.props.getItems();
   }

   onDeleteClick = (id?: string) => {
      this.props.deleteItem(id);
   }

   onToggle = (checked: boolean, name: string, id?: string) => {
      let updatedItem: ShoppingListItem = {
         _id: id,
         name: name,
         checked: !checked
      }

      this.props.checkItem(updatedItem, id);
   }

   render() {
      const { items } = this.props.item;
      return (
         <Container>
            <ListGroup>
               <TransitionGroup className="shopping-list">
                  {items.map(({ _id, name, checked }) => (
                     <CSSTransition key={_id} timeout={500} classNames="fade">
                        <ListGroupItem color={checked ? "success" : "warning"} onClick={this.onToggle.bind(this, checked, name, _id)}>
                           <Button
                              className="remove-btn"
                              color={checked ? "success" : "warning"}
                              size="sm"
                              onClick={this.onDeleteClick.bind(this, _id)}
                           >&times;</Button>
                           {name}
                        </ListGroupItem>
                     </CSSTransition>
                  ))}
               </TransitionGroup>
            </ListGroup>
         </Container>
      )
   }
}

const mapStateToProps = (state: any) => ({
   item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem, checkItem })(ShoppingList);