import { Alert } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';

const Notification = () => {
  const info = useAppSelector(({ info }) => info);

  if (!info.message) {
    return null;
  }

  return (
    <Alert variant={info.type === 'error' ? 'warning' : 'info'}>
      {info.message}
    </Alert >
  );
};

export default Notification;
