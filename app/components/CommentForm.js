import React, {Component} from 'react';
import $ from 'jquery';
class CommentForm extends React.Component{
  constructor(props){
      super(props);
  }
  addComment(e){
    e.preventDefault();
    $.ajax({
      url: '/comments',
      type: 'POST',
      dataType: 'JSON',
      data: { author: this.refs.author.value, content: this.refs.content.value }
    }).done( data => {
      this.props.addComment(data);
    }).fail( msg => {
      console.log(msg);
    });
  }
  render() {
    return (<div className="commentForm">
              <form onSubmit={(e) => this.addComment(e)}>
                <input type='text' ref='author' placeholder='author' />
                <input type='text' ref='content' placeholder='content' />
                <button type='submit'>Add Comment</button>
              </form>
            </div>);
  }
}

export default CommentForm;
