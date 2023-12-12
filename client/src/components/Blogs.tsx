import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const Blogs = () => {
  const blogs = useAppSelector(({ blogs }) => blogs);

  return (
    <div>
      {blogs.map(b => (
        <p key={b.id}>
          <Link to={`blogs/${b.id}`}>
            {b.title}
          </Link>
        </p>
      ))}
    </div>
  );
};

export default Blogs;
