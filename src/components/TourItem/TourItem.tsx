import s from './TourItem.module.css';
import { useState } from 'react';
import { Tour } from '../../TourApiResponseTypes';

const TourItem = ({ image, name, info, price }: Tour) => {
  const [isReadMoreOn, setIsReadMoreOn] = useState(false);
  // splits the string by words rather than chars, so slice returns a meaningful last word
  const shortInfo = info.split(' ').slice(0, 20).join(' ').concat('...');

  return (
    <>
      <div className={s.tourCard}>
        <div className={s.tourImageWrapper}>
          <img className={s.tourImage} src={image} alt={name} width={300} />
        </div>
        <div className={s.tourSpecs}>
          <p className={s.tourName}>{name}</p>
          <p className={s.tourPrice}>$ {price}</p>
        </div>

        <p className={s.tourInfo}>
          {!isReadMoreOn ? `${shortInfo}` : `${info}`}
          <button onClick={() => setIsReadMoreOn(!isReadMoreOn)} className={s.showMore}>
            {isReadMoreOn ? 'Show less' : 'Show more'}
          </button>
        </p>
      </div>
    </>
  );
};

export default TourItem;
