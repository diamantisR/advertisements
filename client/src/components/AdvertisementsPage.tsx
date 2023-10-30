import React, { useEffect, useState } from 'react';
import * as AdvertisementsApi from '../api/advertisements-api';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const AdvertisementsPage: React.FC = () => {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState<any[]>([]);

  useEffect(() => {
    async function loadAdvertisements() {
      try {
        const advertisements = await AdvertisementsApi.fetchAdvertisements();
        setAdvertisements(advertisements);
      } catch (error) {
        console.error(error);
      }
    }
    loadAdvertisements();
  }, []);

  async function deleteAdvertisement(advertisement: any) {
    try {
      await AdvertisementsApi.deleteAdvertisement(advertisement._id);
      setAdvertisements(
        advertisements.filter(
          existingAd => existingAd._id !== advertisement._id
        )
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const formatCurrency = value => {
    return value.toLocaleString('gr-GR', {
      style: 'currency',
      currency: 'EUR'
    });
  };

  const priceBodyTemplate = ad => {
    return formatCurrency(ad.price);
  };

  const imageBodyTemplate = ad => {
    return (
      <img
        src={`${ad.file}`}
        alt={ad.title}
        className='w-6rem shadow-2 border-round'
      />
    );
  };

  const statusBodyTemplate = ad => {
    return (
      <Tag
        value={ad.activated ? 'Activated' : 'Deactivated'}
        severity={ad.activated ? 'success' : 'danger'}
      ></Tag>
    );
  };

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          rounded
          outlined
          className='mr-2'
          onClick={() => navigate(`/advertisements/${rowData._id}`)}
        />
        <Button
          icon='pi pi-trash'
          rounded
          outlined
          severity='danger'
          onClick={() => deleteAdvertisement(rowData)}
        />
      </React.Fragment>
    );
  };

  const footer = `You have ${advertisements.length} advertisement(s).`;

  return (
    <div className='main-section'>
      <DataTable
        showGridlines
        value={advertisements}
        footer={footer}
        tableStyle={{ minWidth: '40rem' }}
      >
        <Column field='title' header='Title' rowSpan={3}></Column>
        <Column header='Image' body={imageBodyTemplate}></Column>
        <Column field='price' header='Price' body={priceBodyTemplate}></Column>
        {/* <Column field='area' header='Area'></Column> */}
        <Column field='description' header='Description'></Column>
        <Column header='Status' body={statusBodyTemplate}></Column>
        <Column
          colSpan={2}
          body={actionBodyTemplate}
          style={{ width: '9rem' }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default AdvertisementsPage;
