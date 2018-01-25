import React from 'react';
import { Link } from 'react-router-dom';

import Item from '../components/Item';

export default class ItemList extends React.Component{

    render(){
        const onItemDelete = this.props.onItemDelete;
        return(
            <div className="item_list">
                <div className="item_list_header app_header">
                    <span className='title_header'>Sayer</span>
                    <span>World`s mostused time waster</span>
                </div>
                <div className="items_box">
                    {
                        this.props.items.map(function(item, idx){
                            return (
                                <Item
                                    key = {idx}
                                    id = { item.id }
                                    title = { item.title }
                                    comments = { item.comments }
                                    onDelete = { onItemDelete.bind(null, item) }
                                />
                            );
                        })
                    }
                </div>
                <div className='add_new_item_area'>
                    <Link to='/add-item' className='add_new_item_link'>
                        <input type="button" className="add_new_item" value='+'/>
                    </Link>
                </div>
            </div>
        );
    }
}