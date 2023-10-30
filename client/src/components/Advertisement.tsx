import * as React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import { Tag } from 'primereact/tag';

interface AdvertisementProps {
  advertisement: Advertisement;
  onDeleteAdClicked: (advertisement: Advertisement) => void;
}

const Advertisement: React.FC<AdvertisementProps> = ({
  advertisement,
  onDeleteAdClicked
}) => {
  const { createdAt, updatedAt, title, price, _id, activated, file } =
    advertisement;
  let createdAtText = 'Updated: ' + formatDate(createdAt);
  let updatedAtText = 'Created: ' + formatDate(updatedAt);

  const statusBodyTemplate = (active: boolean) => {
    const status = active ? 'Active' : 'Expired';
    return <Tag value={status} severity={active ? 'success' : 'danger'}></Tag>;
  };

  return (
    <div className='card'>
      <Card title={title}>
        <img src={file} alt={''} />
        Price: {price}
        {'\u20AC'}
        <p>Created at: {createdAtText}</p>
        <p>Updated at: {updatedAtText}</p>
        {statusBodyTemplate(activated)}
        <Link to={`/advertisements/${_id}`}>Edit</Link>
        <Button
          icon='pi pi-trash'
          severity='danger'
          onClick={() => onDeleteAdClicked(advertisement)}
        />
      </Card>
    </div>
  );
};

export default Advertisement;
