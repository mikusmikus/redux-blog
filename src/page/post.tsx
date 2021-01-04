import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Comment } from '../store/blog/types';
import { addCommentHandler, deleteCommentAction, deletePostAction } from '../store/blog/action';
import { H1 } from '../components/typography/typography';
import MainBody from '../commonComponents/mainBody/mainBody';
import Post from '../components/post/post';
import SmallPosts from '../components/smallPosts/smallPosts';
import Comments from '../components/comments/comments';

type PostId = {
  postId: string;
};

const PostPage = () => {
  const [commentValue, setCommentValue] = useState('');

  const { postId } = useParams<PostId>();
  const dispatch = useDispatch();
  const history = useHistory();

  const { post, loading, user } = useSelector((state: RootState) => ({
    post: state.blogPosts.find((blogPost) => blogPost.postId === postId),
    loading: state.loading,
    user: state.user,
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (!post) {
      history.push('/notfound');
    }
  }, [postId]);

  const commentHandler = () => {
    if (!commentValue) {
      alert('empty comment');
      return;
    }
    const newComment: Comment = {
      commentId: uuidv4(),
      postId,
      email: 'comment@email.com',
      body: commentValue,
    };
    dispatch(addCommentHandler(newComment));
    setCommentValue('');
  };
  const deletePostHandler = () => {
    window.confirm('Are you sure want to delete post?') && dispatch(deletePostAction(postId));
    history.push('/');
  };

  const deleteCommentHandler = (commentId: string) => {
    window.confirm('Are you sure want to delete post?') &&
      dispatch(deleteCommentAction(commentId, postId));
  };

  if (loading) {
    return (
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1">
          <H1>loading...</H1>;
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1">
          <MainBody>
            <H1>This is Post Page</H1>
            {post && (
              <>
                <Post
                  post={post}
                  user={user}
                  deletePostHandler={deletePostHandler}
                  handleToHomePage={() => history.push('/')}
                  handlePostEdit={() => history.push(`/editpost/${post.postId}`)}
                />

                <SmallPosts id={postId} post={post} />
                <Comments
                  post={post}
                  user={user}
                  inputCommentValue={commentValue}
                  deleteCommentHandler={deleteCommentHandler}
                  commentHandler={commentHandler}
                  commentValueHandler={(value) => setCommentValue(value)}
                />
              </>
            )}
          </MainBody>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
