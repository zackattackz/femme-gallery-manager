import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {refreshState, repositionItems, selectCurrentItems} from './galleryActionsSlice';
import {Input, List, Uploader} from 'rsuite';
import GalleryItemActions from './GalleryItemActions';
import {filterItemsByCollectionType, ItemCollectionType} from './galleryActionsHelpers';
import GalleryCollectionActions from './GalleryCollectionActions';
import ItemUploader from './ItemUploader';

export default function GalleryActions(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshState());
  }, [dispatch]);
  return (
    <div>
      <GalleryCollectionActions collection={ItemCollectionType.IsHero} />
      <GalleryCollectionActions collection={ItemCollectionType.IsNotHero} />
      <ItemUploader />
    </div>
  );
}
