import React from 'react';
import { Link } from 'react-router-dom';

export default class Item extends React.Component{
    
    render(){
        const {title, comments, id} = this.props;
        const onDelete = this.props.onDelete;
        return(
            <div className="item">
                <Link  to={`/item/:${id}`} className='item_title_link'>
                    <div className="item_title" style={{ color: '#2B2F3E'}}>{ title }</div>
                </Link>
                <div className='item_info'>
                    <input type="button" value={comments.length } className='item_count_comments btn_nav_act'/>
                    <input type="button" className="item_delete" onClick={ onDelete } value='Delete'/>
                </div>
            </div>
        );
    }
}