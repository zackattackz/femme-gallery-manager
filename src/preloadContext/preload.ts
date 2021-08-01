// window.addEventListener()

import {contextBridge} from "electron"
import IContextBridgeApi from "../rendererContext/types/IContextBridgeApi"
import GalleryApi from "./data/GalleryApi"

const contextBridgeApi: IContextBridgeApi = {
    galleryApi: GalleryApi
};

Object.entries(contextBridgeApi).forEach(([k,v]) => {
    contextBridge.exposeInMainWorld(k, v); 
});