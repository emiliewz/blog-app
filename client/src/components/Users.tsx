import { useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Users = () => {
  const users = useAppSelector(({ users }) => users);

  if (!users) return null;

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(u => (
            <tr key={u.id}>
              <td>
                <Link className='text-decoration-none' to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;