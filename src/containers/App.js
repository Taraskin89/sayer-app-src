import React from 'react';
import { Route } from 'react-router-dom';

import ItemList from './ItemList';
import CreateItem from './CreateItem';
import CommentList from "./CommentList";

export default class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount(){
        const localItems = JSON.parse(localStorage.getItem('items'));
        if(localItems){
            this.setState({items: localItems})
        }
    }

    componentDidUpdate(){
        this._updateLocalStorage();
    }

    handleItemAdd(newItem){
        const newItems = this.state.items.slice();
        newItems.unshift(newItem);

        this.setState({ items: newItems});

    }

    handleItemDelete(item){
        const id = item.id;
        const newItems = this.state.items.filter(function(it) {
            return it.id !== id;
        });
        this.setState({ items: newItems });
    }

    handleRefreshComments(comments, color, id){
        const itemsArray = this.state.items.slice();
        const newItemsArray =[];
        const currentItem = this.state.items.filter(function(item) {
            return item.id == id;
        });

        const comment = {
            idComment: Date.now(),
            comment: comments,
            color: color
        }

        currentItem[0].comments.push(comment)

        for (let i = 0; i < itemsArray.length; i++){
            if(currentItem.id != itemsArray[i].id){
                newItemsArray.push(itemsArray[i]);
            }
            else newItemsArray.push(currentItem);
        }
        this.setState({
            items: newItemsArray
        });
    }

    render(){
        return(
            <div className="sayer_app">
                <Route exact path="/" render={(props)=>
                    <ItemList {...props } items={ this.state.items }
                                  onItemDelete = { this.handleItemDelete.bind(this)}/>
                }/>
                <Route exact path="/item/:id" render={(props)=>
                    <CommentList {...props } items={ this.state.items }
                              onItemDelete = { this.handleItemDelete.bind(this) }
                              onRefreshComments = { this.handleRefreshComments.bind(this) }/>
                }/>
                <Route path='/add-item' render={ (props) =>
                    <CreateItem {...props} onItemAdd = {this.handleItemAdd.bind(this)}/>
                }/>
            </div>
        );
    }

    _updateLocalStorage() {
        let items = JSON.stringify(this.state.items);
        localStorage.setItem('items', items);
    }
}
