import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    commentsList: [],
    commentsCount: 0,
    inputName: '',
    inputComment: '',
    backgroundColor: initialContainerBackgroundClassNames[0],
  }

  onAddComment = event => {
    event.preventDefault()
    const {
      commentsList,
      commentsCount,
      inputComment,
      inputName,
      backgroundColor,
    } = this.state

    const checkInput = inputName !== ''
    const checkComment = inputComment !== ''
    const newList = {
      id: uuidv4(),
      name: inputName,
      comment: inputComment,
      likeUnlike: false,
      timeHistory: formatDistanceToNow(new Date()),
      likeImageUrl:
        'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png',
      bgColor: backgroundColor,
    }
    if (checkInput && checkComment) {
      this.setState(prevState => ({
        commentsCount: prevState.commentsCount + 1,
        commentsList: [...prevState.commentsList, newList],
      }))
      const color =
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length - 1,
          )
        ]
      this.setState({inputName: '', inputComment: '', backgroundColor: color})
    }
  }

  onChangeNameInput = event => {
    this.setState({inputName: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({inputComment: event.target.value})
  }

  onClickIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (id === each.id) {
          const likeUnlike = !each.likeUnlike
          const likeImageUrl = likeUnlike
            ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

          return {
            ...each,
            likeUnlike,
            likeImageUrl,
          }
        }
        return each
      }),
    }))
  }

  onClickDelete = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(each => each.id !== id),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  render() {
    const {
      commentsList,
      commentsCount,
      inputComment,
      inputName,
      backgroundColor,
    } = this.state
    console.log(backgroundColor)
    return (
      <div className="main-page">
        <form onSubmit={this.onAddComment}>
          <div className="bg">
            <div className="vertical-flex">
              <h1 className="heading">Comments</h1>
              <p>Say something about 4.0 technologies</p>
              <input
                placeholder="Your Name"
                className="input"
                onChange={this.onChangeNameInput}
                value={inputName}
              />
              <textarea
                onChange={this.onChangeCommentInput}
                className="input-text"
                rows="10"
                placeholder="Your Comment"
                value={inputComment}
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
                className="img"
                alt="comments"
              />
            </div>
          </div>
          <hr />
        </form>
        <div className="comments-count">
          <p>
            <span className="count-comments">{commentsCount}</span> Comments
          </p>
        </div>
        <div>
          <ul>
            <CommentItem
              commentsList={commentsList}
              onClickIsLiked={this.onClickIsLiked}
              onClickDelete={this.onClickDelete}
            />
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
