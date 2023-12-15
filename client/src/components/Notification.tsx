import { Alert } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { InfoSliceState } from '../app/types';

const Notification = () => {
  const info: InfoSliceState = useAppSelector(({ info }) => info);

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
