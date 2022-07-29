import { Tour } from './components/TourItem/TourItem'; // interface for tour
import { useState, useEffect } from 'react';
import TourList from './components/TourList/TourList';
import s from './App.module.css';
import Loading from './components/Loading/Loading';

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
    return (
      <div className={s.spinnerWrapper}>
        <Loading />
      </div>
    );
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
        <button
          className={`${s.button} ${s.refreshButton}`}
          type="button"
          onClick={() => fetchTours(URL)}>
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
