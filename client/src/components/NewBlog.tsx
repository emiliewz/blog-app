import { Button, Form } from 'react-bootstrap';
import { handleError, useAppDispatch, useField, useNotification } from '../app/hooks';
import { FormEvent, FormEventHandler } from 'react';
import { createBlog } from '../reducers/blogs';
import { useNavigate } from 'react-router-dom';

const NewBlog = () => {
  const dispatch = useAppDispatch();
  const notifyWith = useNotification();
  const navigate = useNavigate();
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    };
    try {
      await dispatch(createBlog(blog));
      notifyWith(`a new blog by ${blog.author} added`);
    } catch (error: unknown) {
      notifyWith(handleError(error));
    }
    navigate('/');
  };

  return (
    <>
      <h2>Add a new blog</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='blog-title'
            placeholder='title'
            {...title}
          />

          <Form.Label>author:</Form.Label>
          <Form.Control
            id='blog-author'
            placeholder='author'
            {...author}
          />

          <Form.Label>url:</Form.Label>
          <Form.Control
            id='blog-url'
            placeholder='url'
            {...url}
          />
          <Button variant='primary' type='submit'>create</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default NewBlog;

