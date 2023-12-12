const Comment = ({user, text}) => {
    return (
        <div className="comments">
                  <h5 className="comment-user">{user}</h5>
                  <p className="comment-text">{text}</p>
                </div>
    )
}

export default Comment;