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


ReactDOM.render(<CommentBox />, document.getElementById('content'));
