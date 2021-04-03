import axios from "axios";
import { Component } from "react";
import "./BlogContent.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";

export class BlogContent extends Component {
  state = {
    showAddForm: false,
    blogArr: [],
    isPending: false
  };

  fetchPosts = () => {
    this.setState({
      isPending: true
    })
    axios
      .get("https://5fb3db44b6601200168f7fba.mockapi.io/api/posts")
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isPending: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogPosts", JSON.stringify(temp));
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Удалить ${blogPost.title}?`)) {
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

  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddForm) {
      this.handleAddFormHide();
    }
  };

  addNewBlogPost = (blogPost) => {
    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(posts));
      return {
        blogArr: posts,
      };
    });
  };

  componentDidMount() {
    this.fetchPosts();
    window.addEventListener("keyup", this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Загружаю данные...</h1>;

    return (
      <div className="blogPage">
        {this.state.showAddForm && (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        )}

        <>
          <h1>Блог</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Создать новый пост
            </button>
          </div>
          {
            this.state.isPending && <h2>Подождите...</h2>
          }
          <div className="posts">{blogPosts}</div>
        </>
      </div>
    );
  }
}
