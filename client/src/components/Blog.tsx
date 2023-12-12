import { useAppSelector } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Blog = () => {
  const { id } = useParams<{ id?: string }>();
  const blog = useAppSelector(({ blogs }) => blogs.find(b => b.id === id));

  if (!blog) return null;

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
            {blog.likes} likes
          </Card.Text>

          <Card.Text>
            added by {blog.user.name}
          </Card.Text>

          <h3 className='mt-5'>comments</h3>
        </Card.Body>
      </Card>
    </div >
  );
};

export default Blog;
