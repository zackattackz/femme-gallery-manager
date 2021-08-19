import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import GalleryActions from './features/galleryActions/GalleryActions';
import {store} from './store';
import IContextBridgeApi from 'src/types/IContextBridgeApi';
import {WindowWithContextBridgeApi} from 'src/types/WindowWithContextBridgeApi';
const windowWithContextBridgeApi: WindowWithContextBridgeApi = window as WindowWithContextBridgeApi;
import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'

async function render() {
  const rootElement = document.getElementById('root');
  // const galleryItems = await windowWithContextBridgeApi.galleryApi.listGalleryItems();
  ReactDOM.render(
    <Provider store={store}>
      {/* <img src={galleryItems[0].url}></img> */}
      <GalleryActions />
    </Provider>,
    rootElement
  );
  //ReactDOM.render(<img src={galleryItems[0].url}></img>, document.getElementById('root'));
}

render();
