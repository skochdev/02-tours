# Tours mini project

* Fetching tours from an api using `fetch`, **async / await** syntax and `useEffect()`
* Storing them in state using `useState()`
* Implementing sort of state machine to render according to the current state (showing content, loading content, showing error if occurred)
* Some responsiveness, although without any particular media queries

**App.tsx**
```tsx
import { Tour } from './components/TourItem/TourItem'; // interface for tour
import { useState, useEffect } from 'react';
import TourList from './components/TourList/TourList';
import s from './App.module.css';

const URL = 'https://course-api.com/react-tours-project';

function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTours(URL);
  }, []);

  const handleNotInterestedClick = (id: string) => {
    console.log('click');
    console.log(tours);
    setTours(
      tours.filter((tour: Tour) => {
        if (tour.id !== id) {
          return tour;
        }
      }),
    );
  };

  const fetchTours = async (url: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      // guard to help catch 404
      if (response.status > 200 || response.status < 300) {
        const tours = await response.json();
        setIsLoading(false);
        setTours(tours);
      } else {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(response.statusText);
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
      throw new Error('Error fetching tours');
    }
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return (
      <>
        <p>
          {errorMessage}
          We've got an error, please try to refresh the page
        </p>
      </>
    );
  }

  if (tours.length === 0) {
    return (
      <>
        <h1>No tours left</h1>
        <button type="button" onClick={() => setTours([])}>
          Refresh
        </button>
      </>
    );
  }

  return (
    <>
      {tours && (
        <section className={s.section}>
          <TourList tours={tours} handleNotInterestedClick={handleNotInterestedClick} />
        </section>
      )}
    </>
  );
}

export default App;
```

**TourList.tsx**
```tsx
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
    <ul>
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

```

**TourItem.tsx**
```tsx
import s from './TourItem.module.css';
import { useState } from 'react';

export interface Tour {
  id: string;
  name: string;
  info: string;
  image: string;
  price: number;
}

const TourItem = ({ image, name, info, price }: Tour) => {
  const [isReadMoreOn, setIsReadMoreOn] = useState(false);
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

```