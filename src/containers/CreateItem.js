import React from 'react';
import { Link } from 'react-router-dom';

export default class CreateItem extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            inputText: ''
        }
    }

    handleInputChange(e){
        this.setState({
            inputText: e.target.value
        });
    }

    createNewItem(e){
        const warning = document.getElementById('create_warning');
        if(this.state.inputText.length > 0){
            const newItem = {
                id: Date.now(),
                title:this.state.inputText,
                comments: []
            }

            this.props.onItemAdd(newItem);

            warning.style.display='none';
        }
        else {
            e.preventDefault();
            warning.style.display='block';
        }


        this.setState({
            inputText: ''
        });


    }

    render(){
        return(
            <div className='create_new_item'>
                <div className="app_header ">
                    <div className="item_add_header">
                        <Link to="/">
                            <input type="button" className="btn_nav_act" value='&#8592;'/>
                        </Link>
                        <div className='title_header'>Create new item</div>
                    </div>
                </div>
                <div className="item_addItem_input">
                    <input type="text" id='new_item' placeholder='New item title...'
                            onChange={this.handleInputChange.bind(this)}/>
                    <Link to="/" onClick={ this.createNewItem.bind(this)}>
                        <input type="button" className="btn_nav_act" value='&#62;' />
                    </Link>
                </div>
                <div id='create_warning' className="alert_warning">
                    This field should not be empty. Please write something...
                </div>
            </div>
        );
    }
}