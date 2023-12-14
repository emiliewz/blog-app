import { useAppDispatch, useAppSelector, useField } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { Button, Card, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { commentBlog, removeBlog, updateBlog } from '../reducers/blogs';
import { FormEvent, FormEventHandler } from 'react';

const Blog = () => {
  const { id } = useParams<{ id?: string }>();
  const blog = useAppSelector(({ blogs }) => blogs.find(b => b.id === id));
  const user = useAppSelector(({ user }) => user);
  const comment = useField('text');

  const dispatch = useAppDispatch();

  if (!blog) return null;

  const removeOne = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  const likeOne = async () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const canRemove = user?.username === blog.user.username;

  const handleComment: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(commentBlog(comment.value, blog));
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='mt-3 mb-5'>
            {blog.title}
          </h2>

          <Card.Text>
            <Card.Link className='text-decoration-none mb-2' href={blog.url}>
              {blog.url}
            </Card.Link>
          </Card.Text>

          <Card.Text>
            {blog.likes} likes {user && <button onClick={likeOne} className='like'>like</button>}
          </Card.Text>

          <Card.Text>
            added by {blog.user.name}
          </Card.Text>

          {canRemove &&
            <button onClick={removeOne}>delete</button>
          }

          <h3 className='mt-5'>comments</h3>

          {user && <Form onSubmit={handleComment}>
            <Form.Group>
              <Form.Control
                type='text'
                name='comment'
              />
              <Button className='mt-2' variant='secondary' type='submit'>add comment</Button>
            </Form.Group>
          </Form>}

          <ListGroup className='mt-3'>
            {blog.comments.map((c, i) =>
              <ListGroupItem variant='dark' key={i}>{c}</ListGroupItem>)
            }
          </ListGroup>
        </Card.Body>
      </Card>
    </div >
  );
};

export default Blog;
