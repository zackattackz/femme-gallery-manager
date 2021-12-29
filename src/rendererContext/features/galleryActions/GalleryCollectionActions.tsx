import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {List} from 'rsuite';
import {filterItemsByCollectionType, ItemCollectionType} from './galleryActionsHelpers';
import {
  selectCurrentItems,
  repositionItems,
  refreshState,
  selectCurrentItemsByCollectionType,
} from './galleryActionsSlice';
import GalleryItemActions from './GalleryItemActions';

interface GalleryCollectionActionsProps {
  collectionType: ItemCollectionType;
}

export default function GalleryCollectionActions(
  props: GalleryCollectionActionsProps
): JSX.Element {
  const currentItems = useSelector(selectCurrentItemsByCollectionType(props.collectionType));
  const dispatch = useDispatch();
  return (
    <List
      // onSort={(payload) => {
      //   if (payload !== undefined) {
      //     const {newIndex, oldIndex} = payload;
      //     dispatch(repositionItems({newIndex, oldIndex, collection: props.collection}));
      //   }
      // }}
      bordered
    >
      {currentItems
        .sort((a, b) => a.position - b.position)
        .map((item, index) => (
          <List.Item bordered key={item.blobName} index={index}>
            <GalleryItemActions
              item={item}
              collectionLength={currentItems.length}
	      collectionType={props.collectionType}
            ></GalleryItemActions>
          </List.Item>
        ))}
    </List>
  );
}
