import "./AddPostForm.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { Component } from "react";

export class AddPostForm extends Component {
  state = {
    postTitle: "",
    postDesc: "",
  };

  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };

  handlePostDescChange = (e) => {
    this.setState({
      postDesc: e.target.value,
    });
  };

  createPost = (e) => {
    e.preventDefault()
    const post = {
      id: this.props.blogArr.length + 1,
      title: this.state.postTitle,
      description: this.state.postDesc,
      liked: false,
    }

    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide()
  }

  // componentDidMount() {
  //   console.log('Компонент формы отрисовался')
  // }

  // componentDidUpdate() {
  //   console.log('Компонент формы обновился')
  // }

  // componentWillUnmount() {
  //   console.log('Компонент формы удалился')
  // }

  render() {
    const handleAddFormHide = this.props.handleAddFormHide;
    return (
      <>
        <form className="addPostForm" onSubmit={this.createPost}>
          <button className="hideBtn" onClick={handleAddFormHide}>
            <CancelIcon />
          </button>
          <h2>Создание поста</h2>
          <div>
            <input
              className="addFormInput"
              type="text"
              name="postTitle"
              placeholder="Заголовок поста"
              value={this.state.postTitle}
              onChange={this.handlePostTitleChange}
              required
            />
          </div>
          <div>
            <textarea
              className="addFormInput"
              name="postDescription"
              placeholder="Описание поста"
              value={this.state.postDescription}
              onChange={this.handlePostDescChange}
              required
            />
          </div>
          <div>
            <button
              className="blackBtn"
              type="submit"
            >
              Добавить пост
            </button>
          </div>
        </form>
        <div onClick={handleAddFormHide} className="overlay"></div>
      </>
    );
  }
}
