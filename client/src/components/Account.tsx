import { Table } from 'react-bootstrap';
import { byLikes, useAppSelector } from '../app/hooks';
import { BlogsSliceState } from '../app/types';
import { Link } from 'react-router-dom';

const Account = () => {
  const user = useAppSelector(({ user }) => user);
  const blogs: BlogsSliceState[] = useAppSelector(({ blogs }) => blogs).filter(b => b.user.username === user?.username);

  return (
    <div>
      <h3>My favorite Blogs</h3>
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

export default Account;