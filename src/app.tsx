import { useState } from 'react';
import { Layer, Map as MapGL, Source, LineLayer } from 'react-map-gl';
import * as togeojson from '@tmcw/togeojson';
import * as xmldom from 'xmldom';
import { MAP_ACCESS_TOKEN, MAP_STYLE } from './constants';
import 'mapbox-gl/dist/mapbox-gl.css';

import styles from './styles/app.module.scss';

const layerStyle: LineLayer = {
  id: 'my-data',
  type: 'line',
  paint: {
    'line-color': '#007700',
    'line-width': 12,
    'line-opacity': 0.5,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FeatureCollection = any;

function App() {
  const [data, addData] = useState<FeatureCollection[]>([]);
  const [selectedData, setSelectedData] = useState<FeatureCollection>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const textData = await file?.text();
    const domParser = new xmldom.DOMParser();
    const parsed = domParser.parseFromString(textData, 'text/xml');
    const gpx = togeojson.gpx(parsed);

    addData([...data, gpx]);
  }

  const selectData = (index: number) => {
    setSelectedData(data[index]);
  }

  return (
    <div className={styles.root}>
      {!selectedData && 
        <>
          <div>
            <label className={styles.button} htmlFor="file">+ Add GPX Data</label>
            <br />
            <input accept='.gpx' className={styles.fileInput} id="file"  type="file" onChange={handleFileChange} />
          </div>
          <div className={styles.mapsContainer}>
            {Boolean(data.length) && <h4 className={styles.mapsHeader}>Added GPX Data</h4>}
            <div className={styles.mapsList}>
              {data.map((mapData: FeatureCollection, index: number) => (
                <MapGL
                  key={index}
                  initialViewState={{ latitude: mapData.features[0].geometry.coordinates[0][1], longitude: mapData.features[0].geometry.coordinates[0][0], zoom: 20 }}
                  mapStyle={MAP_STYLE}
                  mapboxAccessToken={MAP_ACCESS_TOKEN}
                  style={{ width: '200px', height: '200px', marginRight: '20px', marginTop: '20px' }}
                  onClick={() => selectData(index)}
                >
                  <span className={styles.preview}>Map Preview</span>
                  <Source data={mapData} id="my-data" type="geojson">
                    <Layer {...layerStyle} source={mapData.features[0]} />
                  </Source>
                </MapGL>
              ))}
            </div>
          </div>
        </>
      }
      <div>
        {selectedData && (<>
          <button className={styles.button} type='button' onClick={() => setSelectedData(null)}>Back</button>
          <h3>Map</h3>
          <MapGL
              initialViewState={{ latitude: selectedData.features[0].geometry.coordinates[0][1], longitude: selectedData.features[0].geometry.coordinates[0][0], zoom: 15 }}
              mapStyle={MAP_STYLE}
              mapboxAccessToken={MAP_ACCESS_TOKEN}
              style={{ width: 'calc(100vw - 24px)', height: 'calc(100vh - 124px)', marginTop: '20px' }}
            >
              <Source data={selectedData} id="my-data" type="geojson" >
                <Layer {...layerStyle} source={selectedData.features[0]} />
              </Source>
            </MapGL>
          </>
          )}
        </div>
    </div>
  );
}

export default App;

