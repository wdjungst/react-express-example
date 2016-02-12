import React, {Component} from 'react';
import $ from 'jquery';

class Comment extends React.Component{
  constructor(props){
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editComment = this.editComment.bind(this);
    this.state = { edit: false };
  }
  toggleEdit(){
    this.setState({ edit: !this.state.edit});
  }
  editComment(){
    $.ajax({
      url: `/comments/${this.props.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { content: this.refs.editContent.value }
    }).done( data => {
      this.props.refresh();
      this.toggleEdit();
    }).fail( msg => {
      console.log(msg);
    });
  }
  comment(){
    return (<div onClick={this.toggleEdit} className="comment">
              <h2 className="commentAuthor">{this.props.author}</h2>
              <p>{this.props.content}</p>
              <p>{moment(this.props.updated).format("MM/DD/YYYY")}</p>
            </div>);
  }
  edit(){
    return (<div className="comment">
              <h2 className="commentAuthor">{this.props.author}</h2>
              <input type='text' ref='editContent' defaultValue={this.props.content} />
              <button onClick={this.toggleEdit}>Cancel</button>
              <button onClick={this.editComment}>Save</button>
            </div>);
  }
  render(){
    if (this.state.edit)
      return this.edit();
    else
      return this.comment();
  }
}

export default Comment;

