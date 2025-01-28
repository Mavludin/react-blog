import './PostCard.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

type PostCardProps = {
  title: string
  description: string
  liked: boolean
  likePost: () => void
  deletePost: () => void
  handleEditFormShow: () => void
  handleSelectPost: () => void
  isAdmin: boolean
}

export const PostCard = ({
  title,
  description,
  liked,
  likePost,
  deletePost,
  handleEditFormShow,
  handleSelectPost,
  isAdmin,
}: PostCardProps) => {
  const showEditForm = () => {
    handleSelectPost();
    handleEditFormShow();
  };

  const heartFill = liked ? 'crimson' : 'black';

  return (
    <div className='post'>
      <div className='postContent'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <button onClick={likePost}>
            <FavoriteIcon style={{ fill: heartFill }} />
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className='postControl'>
          <button className='editBtn' onClick={showEditForm}>
            <EditIcon />
          </button>
          <button className='deleteBtn' onClick={deletePost}>
            <DeleteForeverIcon />
          </button>
        </div>
      )}
    </div>
  );
};
