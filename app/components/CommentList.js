import React, {Component} from 'react';
import Comment from './Comment';
class CommentList extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    let comments = this.props.comments.map( comment => {
      return(<Comment refresh={this.props.refresh} key={comment._id} id={comment._id} updated={comment.updated_at} author={comment.author} content={comment.content} />);
    });
    return(<div className="commentList">
            { comments }
           </div>);
  }
}

export default CommentList;
