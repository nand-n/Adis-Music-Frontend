import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from '../Components/NotFound';

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`notfound`, { replace: true });
  }, []);
  return <div className="
  w-full
  h-screen
  p-20
  ">
<NotFound entity={''} />

  </div> ;
};
export default NotFoundPage;
