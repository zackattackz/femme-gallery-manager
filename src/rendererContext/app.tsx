import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IContextBridgeApi from './types/IContextBridgeApi';
type WindowWithContextBridgeApi = typeof window & IContextBridgeApi;
const windowWithContextBridgeApi: WindowWithContextBridgeApi = window as WindowWithContextBridgeApi;

async function render() {
  const galleryItems = await windowWithContextBridgeApi.galleryApi.listGalleryItems();

  ReactDOM.render(<img src={galleryItems[0].url}></img>, document.getElementById('root'));
}

render();
