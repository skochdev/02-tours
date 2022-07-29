import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import s from './Loading.module.css';
const Loading = () => {
  return (
    <div>
      <AiOutlineLoading3Quarters className={s.spinner} size={40} />
    </div>
  );
};

export default Loading;
