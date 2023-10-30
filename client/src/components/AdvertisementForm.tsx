import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoCompleteChangeEvent } from 'primereact/autocomplete';
import { classNames } from 'primereact/utils';
import * as AdvertisementsApi from '../api/advertisements-api';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import { convertToBase64 } from '../utils/convertFile';
import AutoCompleteSelect from './AutoCompleteSelect';

const AdvertisemenForm = (route: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [postImage, setPostImage] = useState<{ file: string }>({ file: '' });
  const [area, setArea] = useState(null);

  const onChangeArea = (event: AutoCompleteChangeEvent) => {
    console.log(event.value);
    setArea(event.value);
    setValue('area', event.value.placeId);
  };

  const propertyTypes: PropertyType[] = [
    { name: 'Rent', code: 'rent' },
    { name: 'Buy', code: 'buy' },
    { name: 'Exchange', code: 'exchange' },
    { name: 'Donation', code: 'donation' }
  ];

  const handleFileUpload = async (e: any) => {
    const file = e.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, file: base64 });
  };

  useEffect(() => {
    if (location?.state) {
      setPostImage({ ...postImage, file: location.state.file });
    }
  }, []);

  const propertyType = propertyTypes.find(
    (type: PropertyType) =>
      location?.state?.type && type.name === location?.state?.type.toString()
  );

  const defaultValues = {
    title: location?.state?.title || '',
    price: location?.state?.price || '',
    type: propertyType || '',
    area: location?.state?.area || '',
    description: location?.state?.description || '',
    activated: false,
    file: postImage || ''
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    register
  } = useForm({ defaultValues });

  const onSubmit = async (data: any) => {
    data.type = data.type.name;
    data.file = postImage.file;
    console.log(data);

    if (location.state) {
      await AdvertisementsApi.updateAdvertisement(location?.state?._id, data);
    } else {
      await AdvertisementsApi.createAdvertisement(data);
    }
    reset();
    navigate('/');
  };

  const getFormErrorMessage = (name: any) => {
    return (
      errors[name] && <small className='p-error'>{errors[name].message}</small>
    );
  };

  return (
    <div className='flex justify-content-center form-demo'>
      <div className='card'>
        <form onSubmit={handleSubmit(onSubmit)} className='p-fluid'>
          <div className='field'>
            <span className='p-float-label'>
              <Controller
                name='title'
                control={control}
                rules={{ required: 'Title is required.' }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    autoFocus
                    className={classNames({
                      'p-invalid': fieldState.invalid
                    })}
                  />
                )}
              />
              <label
                htmlFor='title'
                className={classNames({ 'p-error': errors.title })}
              >
                Title*
              </label>
            </span>
            {getFormErrorMessage('title')}
          </div>

          <div className='field'>
            <span className='p-float-label'>
              <Controller
                name='price'
                control={control}
                rules={{ required: 'Price is required.' }}
                render={({ field, fieldState }) => (
                  <InputText
                    type='number'
                    id={field.name}
                    {...field}
                    className={classNames({
                      'p-invalid': fieldState.invalid
                    })}
                  />
                )}
              />
              <label
                htmlFor='price'
                className={classNames({ 'p-error': errors.price })}
              >
                Price* ({'\u20AC'})
              </label>
            </span>
            {getFormErrorMessage('price')}
          </div>

          <div className='field'>
            <span className='p-float-label'>
              <Controller
                name='area'
                control={control}
                rules={{ required: 'Area is required.' }}
                render={({ field, fieldState }) => (
                  <AutoCompleteSelect
                    onChangeHandler={onChangeArea}
                    selectedArea={area}
                  />
                )}
              />
              <label
                htmlFor='area'
                className={classNames({ 'p-error': errors.area })}
              >
                Area*
              </label>
            </span>
            {getFormErrorMessage('area')}
          </div>

          <div className='field'>
            <span className='p-float-label'>
              <Controller
                name='type'
                control={control}
                rules={{ required: 'Type is required.' }}
                render={({ field }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    onChange={e => {
                      field.onChange(e.value);
                    }}
                    options={propertyTypes}
                    optionLabel='name'
                  />
                )}
              />
              <label
                htmlFor='type'
                className={classNames({ 'p-error': errors.type })}
              >
                Property type*
              </label>
            </span>
            {getFormErrorMessage('type')}
          </div>

          <div className='field'>
            <span className='p-float-label'>
              <Controller
                name='description'
                rules={{ required: 'Type is required.' }}
                control={control}
                render={({ field, fieldState }) => (
                  <InputTextarea
                    {...register(field.name, {
                      maxLength: {
                        value: 155,
                        message: 'Description must be 155 characters'
                      }
                    })}
                    id={field.name}
                    {...field}
                    className={classNames({
                      'p-invalid': fieldState.invalid
                    })}
                  />
                )}
              />
              <label
                htmlFor='description'
                className={classNames({ 'p-error': errors.description })}
              >
                Extra Description
              </label>
            </span>
            {getFormErrorMessage('description')}
          </div>

          <div className='field'>
            <Controller
              name='file'
              control={control}
              render={({ field, fieldState }) => (
                <FileUpload
                  name='file'
                  accept='image/*'
                  emptyTemplate={
                    <p className='m-0'>
                      Drag and drop files to here to upload.
                    </p>
                  }
                  onSelect={handleFileUpload}
                />
              )}
            />
          </div>

          <Button
            type='submit'
            label='Submit'
            className='mt-2'
            severity='info'
          />
        </form>
      </div>
    </div>
  );
};

export default AdvertisemenForm;
