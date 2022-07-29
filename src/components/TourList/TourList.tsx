import { Tour } from '../TourItem/TourItem';
import TourItem from '../TourItem/TourItem';
import s from './TourList.module.css';

type Props = {
  tours: Tour[];
  handleNotInterestedClick: (id: string) => void;
};

const TourList = ({ tours, handleNotInterestedClick }: Props) => {
  const handleNotInterested = (id: string) => {
    handleNotInterestedClick(id);
  };

  return (
    <ul className={s.tourList}>
      {tours.map(({ id, name, image, price, info }: Tour) => (
        <li className={s.tourListItem} key={id}>
          <TourItem name={name} image={image} price={price} info={info} id={id} />
          <button
            className={s.notInterestedBtn}
            type="button"
            onClick={() => handleNotInterested(id)}>
            Not interested
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TourList;
