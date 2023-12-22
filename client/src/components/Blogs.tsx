import { Link } from 'react-router-dom';
import { byComments, byLikes, useAppSelector } from '../app/hooks';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { BlogsSliceState } from '../app/types';
import { useState } from 'react';

const Blogs = () => {
  const blogs: BlogsSliceState[] = useAppSelector(({ blogs }) => blogs);
  const [sort, setSort] = useState<string>('Likes');

  const blogsSorted = () => {
    switch (sort) {
    case 'Likes':
      return [...blogs].sort(byLikes);
    case 'Comments':
      return [...blogs].sort(byComments);
    default:
      return [...blogs].sort(byComments);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <DropdownButton variant='outline-info' size='sm' title={`Sort by: Most ${sort}`}>
        <Dropdown.Item eventKey="1" onClick={() => setSort('Likes')}>Most Likes</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => setSort('Comments')}>Most Comments</Dropdown.Item>
      </DropdownButton>
      <Table striped>
        <tbody>
          {blogsSorted().map(b => (
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
