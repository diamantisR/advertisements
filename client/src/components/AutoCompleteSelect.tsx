import { useState, useEffect } from 'react';
import {
  AutoComplete,
  AutoCompleteCompleteEvent
} from 'primereact/autocomplete';
import { useQuery } from 'react-query';

interface Location {
  placeId: string;
  mainText: string;
  secondaryText: string;
}

const AutoCompleteSelect = (props: any) => {
  const [results, setResults] = useState<any>([]);

  const fetchLocations = async (searchParam: string) => {
    const res = await fetch(
      `https://4ulq3vb3dogn4fatjw3uq7kqby0dweob.lambda-url.eu-central-1.on.aws/?input=${searchParam}`
    );

    const data = await res.json();
    const finalData = data.map((location: Location) => {
      return {
        ...location,
        label: `${location.mainText} - ${location.secondaryText}`
      };
    });
    setResults(finalData);
  };

  const search = (event: AutoCompleteCompleteEvent) => {
    // Timeout to emulate a network connection

    setTimeout(async () => {
      if (event.query.trim().length > 2) {
        fetchLocations(event.query.trim());
      }
    }, 250);

    console.log(event.query);
  };

  return (
    <AutoComplete
      field='label'
      completeMethod={search}
      value={props.selectedArea}
      onChange={props.onChangeHandler}
      id='combo-box-demo'
      suggestions={results}
    />
  );
};

export default AutoCompleteSelect;
