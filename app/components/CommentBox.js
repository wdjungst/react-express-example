import React, {Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

class CommentBox extends React.Component{
  constructor(props){
    super(props);
    this.getAllComments = this.getAllComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.state = { comments: [] };
  }
  componentDidMount(){
    this.getAllComments();
  }
  getAllComments(){
    $.ajax({
      url: '/comments',
      type: 'GET',
      dataType: 'JSON'
    }).done( data => {
      this.setState({ comments: data });
    }).fail( msg => {
      console.log(msg);
    });
  }
  addComment(comment){
    let comments = this.state.comments;
    comments.unshift(comment);
    this.setState({ comments: comments });
  }
  render(){
    return(<div className='commentBox'>
             <h1>Comments</h1>
             <CommentList refresh={this.getAllComments} comments={this.state.comments} />
             <CommentForm addComment={this.addComment} />
           </div>);
  }
}

export default CommentBox;
