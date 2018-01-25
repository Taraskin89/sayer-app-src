import React from 'react';

export default class Comment extends React.Component{

    render(){
        return(
            <div className='comment_item'>
                <div id='comment_avatar' className="comment_avatar" style={{backgroundColor: this.props.avatar}}></div>
                <div className="comment_text">
                    { this.props.comment }
                </div>
            </div>
        );
    }
}