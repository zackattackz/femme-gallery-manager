import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  LoadingStatuses,
  refreshState,
  repositionItems,
  selectCurrentItems,
  selectCurrentStatus,
} from './galleryActionsSlice';
import {Input, List, Loader, Uploader} from 'rsuite';
import GalleryItemActions from './GalleryItemActions';
import {filterItemsByCollectionType, ItemCollectionType} from './galleryActionsHelpers';
import GalleryCollectionActions from './GalleryCollectionActions';
import ItemUploader from './ItemUploader';

export default function GalleryActions(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshState());
  }, [dispatch]);
  const status = useSelector(selectCurrentStatus);
  if (status === LoadingStatuses.IsSuccess) {
    return (
      <div>
        <GalleryCollectionActions collectionType={ItemCollectionType.IsHero} />
        <GalleryCollectionActions collectionType={ItemCollectionType.IsNotHero} />
        <ItemUploader />
      </div>
    );
  } else {
    return <Loader center size="lg" />;
  }
}
