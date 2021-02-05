import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../action";


class PostsShow extends Component {

    componentDidMount() {
        if(!this.props.post) {
            const { id } = this.props.match.params;
            this.props.fetchPost(id);
        }
    }


    onDeletePost() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if(!post){
            return null;
        }


        return (
            <div>
                <div className="d-flex justify-content-between">
                    <Link to="/">{"<- Back to Posts"}</Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={this.onDeletePost.bind(this)}
                    >Delete Post</button>
                </div>
                <div className="cardmt-5">
                    <div className="card-body">
                        <h3 className="card-title">{post.title}</h3>
                        <p className="card-subtitle mb-2 text-muted">{post.categories}</p>
                        <p className="card-text">{post.content}</p>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(
    mapStateToProps,
    { fetchPost, deletePost }
)(PostsShow);