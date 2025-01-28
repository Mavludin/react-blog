import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { Result, Button } from 'antd';

export const NoMatch = () => {
  const location = useLocation<{ from: string }>();
  const history = useHistory();

  const backHome = () => {
    history.push('/')
  }

  if (!location?.state?.from) return <Redirect to="/" />

  return (
    <div className='page404'>
      <Result
        status='404'
        title='404'
        subTitle={`Страница ${location.state.from} не найдена`}
        extra={<Button onClick={backHome} type='primary'>Вернуться на главную</Button>}
      />
    </div>
  );
};
