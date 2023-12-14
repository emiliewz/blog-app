import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useField } from '../app/hooks';
import { FormEvent, FormEventHandler } from 'react';
import { createBlog } from '../reducers/blogs';

const NewBlog = () => {
  const dispatch = useAppDispatch();
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      }));
    } catch (exception) {
      console.log('something went wrong');
    }
  };

  return (
    <>
      <h4>Create a new blog</h4>

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

