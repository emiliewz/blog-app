import { Link } from 'react-router-dom';
import { assertNever, byComments, byCreateDate, byLikes, useAppSelector } from '../app/hooks';
import { Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { BlogsSliceState, SortType } from '../app/types';
import { useState } from 'react';

const Blogs = () => {
  const blogs: BlogsSliceState[] = useAppSelector(({ blogs }) => blogs);
  const [sort, setSort] = useState<SortType>(SortType.Likes);

  const getSortedBlogs = () => {
    switch (sort) {
      case SortType.Likes:
        return [...blogs].sort(byLikes);
      case SortType.Comments:
        return [...blogs].sort(byComments);
      case SortType.Recently:
        return [...blogs].sort(byCreateDate);
      default:
        return assertNever(sort);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <DropdownButton variant='outline-info' size='sm' title={`Sort by: Most ${sort}`}>
        <Dropdown.Item eventKey="1" onClick={() => setSort(SortType.Likes)}>Most Likes</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => setSort(SortType.Comments)}>Most Comments</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => setSort(SortType.Recently)}>Most Recently</Dropdown.Item>
      </DropdownButton>
      <Table striped>
        <tbody>
          {getSortedBlogs().map(b => (
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
