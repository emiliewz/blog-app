import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useField, useNotification } from '../app/hooks';
import { FormEvent, FormEventHandler } from 'react';
import { createBlog } from '../reducers/blogs';

const NewBlog = () => {
  const dispatch = useAppDispatch();
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const notifyWith = useNotification();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    };
    dispatch(createBlog(blog)).unwrap().catch(error => notifyWith(error.message)
    );
  };

  return (
    <>
      <h2>Create a new blog</h2>

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

