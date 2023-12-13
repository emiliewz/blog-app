import { Button, Form } from 'react-bootstrap';
import { useAppDispatch, useField } from '../app/hooks';
import { FormEvent, FormEventHandler } from 'react';
import { create } from '../reducers/blogs';
import blogsService from '../services/blogs';

const NewBlog = () => {
  const dispatch = useAppDispatch();
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
    console.log('submit func');

    event.preventDefault();
    try {
      const blog = await blogsService.create({
        title: title.value,
        author: author.value,
        url: url.value
      });
      dispatch(create(blog));
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

