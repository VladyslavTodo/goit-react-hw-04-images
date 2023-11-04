import { useState, useEffect } from 'react';

import getImagesApi from '../sevices/api';

import Notiflix from 'notiflix';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ButtonLoadMore from '../ButtonLoadMore/ButtonLoadMore';
import Modal from '../Modal/Modal';

const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!value) return;
    getImg();
  }, [page, value]);

  const getImg = () => {
    setIsLoading(true);
    setError(null);

    getImagesApi(value, page)
      .then(data => {
        if (data.totalHits === 0) {
          Notiflix.Report.info('Wrong 😪', 'Try again');
        }
        setImages(prevState =>
          page === 1 ? data.hits : [...prevState, ...data.hits]
        );
        setTotalHits(data.totalHits);
      })
      .catch(error => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getSearchValue = value => {
    setValue(value);
    setPage(1);
  };

  const handelloadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModalUrl = modalUrl => {
    setModalUrl(modalUrl);
  };

  const handelModalOpen = value => {
    setIsModalOpen(true);
    openModalUrl(value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={getSearchValue} />
      {error && <h1>{error}</h1>}
      <ImageGallery images={images} handelModalOpen={handelModalOpen} />
      {isLoading && <Loader />}
      {totalHits > images.length && <ButtonLoadMore onClick={handelloadMore} />}
      {isModalOpen && <Modal modalUrl={modalUrl} closeModal={closeModal} />}
    </>
  );
};

export default App;
