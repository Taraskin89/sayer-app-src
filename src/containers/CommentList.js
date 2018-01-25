import React from 'react';
import { Link } from 'react-router-dom';
import Comment from "../components/Comment";

export default class CommentList extends React.Component{

    constructor(props){
        super(props);

        this.state= {
            currentItem: [],
            commentText:'',
        }
    }

    componentWillMount(){
        this.findComments();
    }

    handleInputCommentChange(e){
        this.setState({
            commentText: e.target.value
        });
    }

    findComments(){
        const url = location.href.split('/')[location.href.split('/').length-1].slice(1);

        const currentItem = this.props.items.filter(function(item) {
            return item.id == url;
        });
        this.setState({
            currentItem: currentItem
        });
    }

    addNewComment(){
        const current = this.state.currentItem[0];
        const id = current.id;
        const avatarColor = this.randomColor();

        let commentInput = document.getElementById('new_comment');
        const commentWarning = document.getElementById('comment_warning');

        if(this.state.commentText.length > 0){
            this.props.onRefreshComments(this.state.commentText, avatarColor, id);
            this.setState({
                commentText: ''
            });
            commentInput.value = '';
            commentWarning.style.display='none';
        }
        else{
            commentWarning.style.display='block';
        }

        this.setState({
            avatarColor: avatarColor
        });
    }

    randomColor(){
        let c = '';
        while (c.length < 6) {
            c += (Math.random()).toString(16).substr(-6).substr(-1)
        }
        return '#'+c;
    }

    render(){
        const current = this.state.currentItem[0];
        const comments = current.comments;

        return(
            <div className='comment_list'>
                <div className="app_header ">
                    <div className="item_add_header">
                        <Link to="/">
                            <input type="button" className="btn_nav_act" value='&#8592;'/>
                        </Link>
                        <div className='title_header' title={ current.title }>{ current.title }</div>
                    </div>
                </div>
                <div className="comment_box">
                    {
                        comments.length > 0
                            ? comments.map((c, i)=>

                                    <Comment key={i} comment={ c.comment } avatar={c.color}/>
                                )
                            : <h3 style={{ color: 'black', textAlign: 'center' }}>Comments not found...</h3>
                    }
                </div>

                <div className="add_comments">
                    <div id='comment_warning'  className="alert_warning warnig_comments">
                        This field should not be empty. Please write something...
                    </div>
                    <input type="text" id='new_comment' placeholder='New comment goes here...'
                           onChange={this.handleInputCommentChange.bind(this)}/>
                    <input type="button" className="btn_nav_act" value='&#62;'
                           onClick={ this.addNewComment.bind(this)}/>
                </div>

            </div>
        );
    }
}