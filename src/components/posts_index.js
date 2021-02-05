import _ from "lodash";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchPosts } from "../action";


class PostsIndex extends Component {

	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return _.map(this.props.posts, post => {
			return (
				<li className="list-group-item" key={post.id}>
					<Link to={`/post/${post.id}`}>{post.title}</Link>
				</li>
			);
		});
	}

	render() {
		return (
			<div>
				<div className="text-right">
					<Link to="/posts/new" className="btn btn-outline-dark">Add Post</Link>
				</div>
				<h3>Page Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return { posts: state.posts };
}

export default connect(
	mapStateToProps,
	{ fetchPosts }
)(PostsIndex);
