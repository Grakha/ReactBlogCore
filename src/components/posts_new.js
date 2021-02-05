import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from "../action";


class PostsNew extends Component {


    renderField (field) {
        const { meta: {touched, error} } = field;
        const validStyle = `form-group ${touched && error ? ' has-invalid' : ''}`;

        const inputField = <input className="form-control" type={field.type} {...field.input} />;
        const textareaField = <textarea className="form-control" rows="3" {...field.input} style={{resize: "none"}}/>;

        return (
            <div className={validStyle}>
                <label className="label">{field.label}</label>
                { field.textarea ? textareaField : inputField }
                <div className="message">{touched ? error : ''}</div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        console.log(this.props);
        const { handleSubmit } = this.props;

        return (
            <React.Fragment>
                <h3>New Post</h3>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        type="text"
                        label="Title"
                        name="title"
                        component={this.renderField}
                    />
                    <Field
                        type="text"
                        label="Categories :"
                        name="categories"
                        component={this.renderField}
                    />
                    <Field
                        type="text"
                        label="Content :"
                        name="content"
                        textarea={true}
                        component={this.renderField}
                    />
                    <div className="btn-group d-flex justify-content-end">
                        <button type="submit" className="btn btn-outline-primary">Add Post</button>
                        <Link to="/" className="btn btn-outline-dark">Cancel</Link>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = 'Enter a title';
    }

    if(!values.categories) {
        errors.categories = 'Fill category please';
    }

    if(!values.content) {
        errors.content = 'Please provide content';
    }

    return errors;
}

const createReduxForm = reduxForm({
    validate,
    form: 'PostsNewForm'
});

export default createReduxForm(connect(
    null,
    { createPost }
)(PostsNew));