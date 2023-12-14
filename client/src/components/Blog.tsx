import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { remove, updateBlog } from '../reducers/blogs';

const Blog = () => {
  const { id } = useParams<{ id?: string }>();
  const blog = useAppSelector(({ blogs }) => blogs.find(b => b.id === id));
  const user = useAppSelector(({ user }) => user);

  const dispatch = useAppDispatch();

  if (!blog) return null;

  const removeOne = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(remove(blog.id));
    }
  };

  const likeOne = async () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const canRemove = user?.username === blog.user.username;

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
        </Card.Body>
      </Card>
    </div >
  );
};

export default Blog;
