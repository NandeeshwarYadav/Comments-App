// Write your code here
import './index.css'

const CommentItem = props => {
  const {commentsList, onClickIsLiked, onClickDelete, color} = props

  return (
    <div>
      {commentsList.map(each => {
        const {
          id,
          name,
          comment,
          likeUnlike,
          timeHistory,
          likeImageUrl,
          bgColor,
        } = each
        const clickLikeButton = () => {
          onClickIsLiked(id)
        }
        const clickDeleteBtn = () => {
          onClickDelete(id)
        }
        const checkLikeBtn = likeUnlike ? 'liked' : ''

        return (
          <li key={id} className="list-item">
            <div>
              <div className="name-container">
                <div className={bgColor}>
                  <p>{name[0]} </p>
                </div>
                <div>
                  <p className="name">{name}</p>
                </div>
                <div>
                  <p className="time-history">{timeHistory}</p>
                </div>
              </div>
              <div>
                <p className="comment">{comment}</p>
              </div>
              <div className="like-delete-container">
                <div>
                  <img src={likeImageUrl} className="like-img" alt="like" />
                  <button
                    type="button"
                    className={`unliked ${checkLikeBtn} `}
                    onClick={clickLikeButton}
                  >
                    Like
                  </button>
                </div>
                <div>
                  <button
                    data-testid="delete"
                    type="button"
                    className="delete"
                    onClick={clickDeleteBtn}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                      className="delete-img"
                      alt="delete"
                    />
                  </button>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </div>
  )
}

export default CommentItem
