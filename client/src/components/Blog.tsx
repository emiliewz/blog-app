import { handleError, useAppDispatch, useAppSelector, useField, useNotification } from '../app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { commentBlog, removeBlog, updateBlog } from '../reducers/blogs';
import { FormEvent, FormEventHandler } from 'react';

const Blog = () => {
  const { id } = useParams<{ id?: string }>();
  const blog = useAppSelector(({ blogs }) => blogs.find(b => b.id === id));
  const user = useAppSelector(({ user }) => user);
  const comment = useField('text');

  const dispatch = useAppDispatch();
  const notifyWith = useNotification();
  const navigate = useNavigate();

  if (!blog) return null;

  const removeOne = async () => {
    if (window.confirm(`Do you want to remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await dispatch(removeBlog(blog.id));
        notifyWith(`The blog by ${blog.author} has been deleted successfully.`);
        navigate('/');
      } catch (error: unknown) {
        notifyWith(handleError(error));
      }
    }
  };

  const likeOne = async () => {
    try {
      await dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
      notifyWith(`The blog by ${blog.author} has been liked successfully.`);
    } catch (error: unknown) {
      notifyWith(handleError(error));
    }
  };

  const canRemove: boolean = user?.username === blog.user.username;

  const handleComment: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(commentBlog(comment.value, blog));
      notifyWith(`A comment added for blog ${blog.title}`);
    } catch (error: unknown) {
      notifyWith(handleError(error));
    }
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
                {...comment}
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
