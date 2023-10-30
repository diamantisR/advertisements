import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeflex/primeflex.css'; // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import AdvertisementDetails from './components/AdvertisementDetails';
import MainHeader from './components/MainHeader/MainHeader';
import NotFound from './components/NotFound';
import AdvertisementsPage from './components/AdvertisementsPage';
import AdvertisemenForm from './components/AdvertisementForm';
import AdvertisementEditForm from './components/AdvertisementEditForm';

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <MainHeader />
        <main>
        <Routes>
          <Route path='/' element={<AdvertisementsPage />} />
          <Route path='/advertisements/create' element={<AdvertisemenForm />} />
          <Route
            path='/advertisements/edit/:id'
            element={<AdvertisemenForm />}
          />
          <Route
            path='/advertisements/:id'
            element={<AdvertisementDetails />}
          />
          <Route path='*' element={<NotFound />} />
          </Routes>
          </main>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
