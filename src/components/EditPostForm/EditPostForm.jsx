import "./EditPostForm.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { useEffect, useState } from "react";

export const EditPostForm = (props) => {

  const [postTitle, setPostTitle] = useState(props.selectedPost.title)
  const [postDesc, setPostDesc] = useState(props.selectedPost.description)

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value)
  };

  const handlePostDescChange = (e) => {
    setPostDesc(e.target.value)
  };

  const savePost = (e) => {
    e.preventDefault()
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDesc,
      liked: props.selectedPost.liked,
    }

    props.editBlogPost(post);
    props.handleEditFormHide()
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        props.handleEditFormHide();
      }
    };
    window.addEventListener('keyup', handleEscape)

    return () => window.removeEventListener('keyup', handleEscape)
  }, [props])

  const handleEditFormHide = props.handleEditFormHide;
  return (
    <>
      <form className="editPostForm" onSubmit={savePost}>
        <button className="hideBtn" onClick={handleEditFormHide}>
          <CancelIcon />
        </button>
        <h2>Редактирование поста</h2>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="postTitle"
            placeholder="Заголовок поста"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="editFormInput"
            name="postDescription"
            placeholder="Описание поста"
            value={postDesc}
            onChange={handlePostDescChange}
            rows={8}
            required
          />
        </div>
        <div>
          <button
            className="blackBtn"
            type="submit"
          >
            Сохранить
          </button>
        </div>
      </form>
      <div onClick={handleEditFormHide} className="overlay"></div>
    </>
  );
}
