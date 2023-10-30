import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as AdvertisementsApi from '../api/advertisements-api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const AdvertisementDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [advertisement, setAdvertisement] = useState<any>(null);

  const updateAdStatus = async () => {
    await AdvertisementsApi.updateAdvertisement(advertisement._id, {
      ...advertisement,
      activated: !advertisement.activated
    });

    setAdvertisement((prevState: Advertisement) => {
      return { ...prevState, activated: !prevState.activated };
    });
  };

  useEffect(() => {
    async function loadAdvertisement() {
      try {
        const advertisementData = await AdvertisementsApi.fetchAdvertisement(
          id!
        );
        setAdvertisement(advertisementData);
      } catch (error) {
        console.error(error);
        // setShowadvertisementsLoadingError(true);
      } finally {
        // setadvertisementsLoading(false);
      }
    }
    loadAdvertisement();
  }, []);

  let createdAtText = 'Updated: ' + advertisement?.createdAt;
  let updatedAtText = 'Created: ' + advertisement?.updatedAt;

  const statusBodyTemplate = (active: boolean) => {
    const status = active ? 'Active' : 'Expired';
    return <Tag value={status} severity={active ? 'success' : 'danger'}></Tag>;
  };

  const header = <img alt='Card' src={advertisement?.file} />;
  const footer = (
    <div className='text-right'>
      <Button
        label='Edit'
        onClick={() =>
          navigate(`/advertisements/edit/${advertisement._id}`, {
            state: { ...advertisement }
          })
        }
        severity='info'
        outlined
      />

      <Button
        onClick={updateAdStatus}
        outlined
        label={!advertisement?.activated ? 'Activate' : 'Deactivate'}
        severity={!advertisement?.activated ? 'success' : 'danger'}
        style={{ marginLeft: '0.5em' }}
      />
    </div>
  );

  return (
    <div className='card flex justify-content-center mt-6'>
      <Card
        title={advertisement?.title}
        subTitle={advertisement?.description}
        footer={footer}
        header={header}
        className='md:w-25rem'
      >
        <p className='m-0'>{createdAtText}</p>
        <p className='m-0'>{updatedAtText}</p>
        <p className='text-left'>
          {statusBodyTemplate(advertisement?.activated)}
        </p>
        <p>
          <span style={{ fontWeight: 700 }}>Place ID:</span>{' '}
          {advertisement?.area.substring(0, 30)}
        </p>
      </Card>
    </div>
  );
};

export default AdvertisementDetails;
