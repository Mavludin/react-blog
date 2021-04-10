import axios from "axios";
import { Component } from "react";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { EditPostForm } from "./components/EditPostForm";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {}
  };

  fetchPosts = () => {
    axios
      .get("https://5fb3db44b6601200168f7fba.mockapi.io/api/posts")
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;

    axios
      .put(
        `https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/${blogPost.id}`,
        temp
      )
      .then((response) => {
        console.log("Пост изменен => ", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });
      axios
        .delete(
          `https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/${blogPost.id}`
        )
        .then((response) => {
          console.log("Пост удален => ", response.data);
          this.fetchPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .post("https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/", blogPost)
      .then((response) => {
        console.log("Пост создан =>", response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBlogPost = (updatedBlogPost) => {
    this.setState({
      isPending: true,
    });
    axios.put(`https://5fb3db44b6601200168f7fba.mockapi.io/api/posts/${updatedBlogPost.id}`, updatedBlogPost)
    .then((response) => {
      console.log("Пост отредактирован =>", response.data);
      this.fetchPosts();
    })
    .catch((err) => {
      console.log(err);
    });

  }

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };

  handleEditFormShow = () => {
    this.setState({
      showEditForm: true,
    });
  };

  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost
    })
  }

  componentDidMount() {
    this.fetchPosts();
  }

  render() {
    console.log(this.state.selectedPost)
    const blogPosts = this.state.blogArr.map((item) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectPost={()=>this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>;

    const postsOpactiy = this.state.isPending ? 0.5 : 1

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        {
          this.state.showEditForm && (
            <EditPostForm
              handleEditFormHide={this.handleEditFormHide}
              selectedPost={this.state.selectedPost}
              editBlogPost={this.editBlogPost}
            />
          )
        }

        <>
          <h1>Блог</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Создать новый пост
            </button>
          </div>

          <div className="posts" style={{opacity: postsOpactiy}}>
            {blogPosts}
          </div>
          {this.state.isPending && <CircularProgress className="preloader" />}
        </>
      </div>
    );
  }
}
