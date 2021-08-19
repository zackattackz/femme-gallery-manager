import {BlobNameToItemMap} from 'src/types/BlobNameToItemMap';
import {ActionKinds, GalleryActions} from 'src/types/GalleryActions';
import {GalleryItem, isLocalGalleryItem, LocalGalleryItem} from 'src/types/GalleryItems';

export function getActionsFromChanges(
  oldGallery: BlobNameToItemMap,
  newGallery: BlobNameToItemMap
): GalleryActions {
  const allActionsForEachItem = Object.entries(newGallery).map(([blobName, newItem]) => {
    const actionsForThisItem: GalleryActions = [];

    // If this blob is a LocalGalleryItem, its a newly uploaded blob.
    if (isLocalGalleryItem(newItem)) {
      actionsForThisItem.push({
        kind: ActionKinds.CreateItem,
        itemBlobName: blobName,
        itemToCreate: newItem,
      });
      // Because this is a new item, it cant have any other actions associated with it
      return actionsForThisItem;
    }

    const oldItem = oldGallery[blobName];

    // Check if this item has been renamed
    if (oldItem.displayName !== newItem.displayName) {
      actionsForThisItem.push({
        kind: ActionKinds.Rename,
        itemBlobName: blobName,
        newDisplayName: newItem.displayName,
      });
    }

    // Check if this item has had its position changed
    if (oldItem.position !== newItem.position) {
      actionsForThisItem.push({
        kind: ActionKinds.SetPosition,
        itemBlobName: blobName,
        newPosition: newItem.position,
      });
    }

    // Check if this item has had its isHero changed
    if (oldItem.isHero !== newItem.isHero) {
      actionsForThisItem.push({
        kind: ActionKinds.SetIsHero,
        itemBlobName: blobName,
        newIsHero: newItem.isHero,
      });
    }

    return actionsForThisItem;
  });

  // Check oldGallery for any items that do not exist in newGalley (deleted)
  const deletedBlobNames = Object.keys(oldGallery).filter(
    (blobName) => !Object.keys(newGallery).includes(blobName)
  );

  // Flatten all actions into one array and concat with all the deletion actions
  return allActionsForEachItem.flat().concat(
    deletedBlobNames.map((deletedBlobName) => {
      return {
        kind: ActionKinds.Delete,
        itemBlobName: deletedBlobName,
      };
    })
  );
}

export const enum ItemCollectionType {
  IsHero,
  IsNotHero,
}

export function filterItemsByCollectionType(
  items: GalleryItem[],
  collectionToFilterBy: ItemCollectionType
): GalleryItem[] {
  switch (collectionToFilterBy) {
    case ItemCollectionType.IsHero:
      return items.filter((item) => item.isHero);
    case ItemCollectionType.IsNotHero:
      return items.filter((item) => !item.isHero);
    default:
      throw new Error('Invalid ItemCollection');
  }
}
