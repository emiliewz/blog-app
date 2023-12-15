import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Table } from 'react-bootstrap';
import { BlogsSliceState } from '../app/types';

const Blogs = () => {
  const blogs: BlogsSliceState[] = useAppSelector(({ blogs }) => blogs);

  const byLikes = (a: BlogsSliceState, b: BlogsSliceState): number => b.likes - a.likes;

  return (
    <div>
      <h2>Blogs</h2>

      <Table striped>
        <tbody>
          {[...blogs].sort(byLikes).map(b => (
            <tr key={b.id}>
              <td>
                <Link className='text-decoration-none' to={`/blogs/${b.id}`}>
                  {b.title}
                </Link>
              </td>
              <td>
                {b.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

export default Blogs;
