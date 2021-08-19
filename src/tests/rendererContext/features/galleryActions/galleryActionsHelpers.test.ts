import {getActionsFromChanges} from 'src/rendererContext/features/galleryActions/galleryActionsHelpers';
import {BlobNameToItemMap} from 'src/types/BlobNameToItemMap';
import {
  GalleryActions,
  ActionKinds,
  RenameAction,
  SetPositionAction,
  SetIsHeroAction,
  CreateItemAction,
  DeleteItemAction,
} from 'src/types/GalleryActions';
import {LocalGalleryItem} from 'src/types/GalleryItems';

test('Delete actions will be made for deleted items', async () => {
  const oldGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item One',
      isHero: false,
      position: 0,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: false,
      position: 1,
      url: 'website/item2',
    },
  };
  const newGallery: BlobNameToItemMap = Object.assign({}, oldGallery);
  delete newGallery['item2'];

  const result = getActionsFromChanges(oldGallery, newGallery);

  expect(result.length).toEqual(1);

  expect(result[0]).toStrictEqual<DeleteItemAction>({
    kind: ActionKinds.Delete,
    itemBlobName: 'item2',
  });
});

test('Create actions will be made for new items', async () => {
  const oldGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item One',
      isHero: false,
      position: 0,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: false,
      position: 1,
      url: 'website/item2',
    },
  };
  const newGallery: BlobNameToItemMap = Object.assign({}, oldGallery, {
    item3: {
      blobName: 'item3',
      displayName: 'Item Three',
      isHero: false,
      position: 2,
      filePath: 'fakepath',
    },
    item4: {
      blobName: 'item4',
      displayName: 'Item Four',
      isHero: false,
      position: 3,
      filePath: 'fakepath',
    },
  });

  const result = getActionsFromChanges(oldGallery, newGallery);

  expect(result.length).toEqual(2);

  expect(result[0]).toStrictEqual<CreateItemAction>({
    kind: ActionKinds.CreateItem,
    itemBlobName: 'item3',
    itemToCreate: newGallery['item3'] as LocalGalleryItem,
  });

  expect(result[1]).toStrictEqual<CreateItemAction>({
    kind: ActionKinds.CreateItem,
    itemBlobName: 'item4',
    itemToCreate: newGallery['item4'] as LocalGalleryItem,
  });
});
test('rename actions will only appear for items that have a new display name', async () => {
  const oldGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item One',
      isHero: false,
      position: 0,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: false,
      position: 1,
      url: 'website/item2',
    },
  };
  const newGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item Uno',
      isHero: false,
      position: 0,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: false,
      position: 1,
      url: 'website/item2',
    },
  };

  const result = getActionsFromChanges(oldGallery, newGallery);

  expect(result.length).toEqual(1);

  expect(result[0]).toStrictEqual<RenameAction>({
    kind: ActionKinds.Rename,
    itemBlobName: 'item1',
    newDisplayName: newGallery['item1'].displayName,
  });
});

test('set position actions will only appear for items that have a new position', async () => {
  const oldGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item One',
      isHero: false,
      position: 0,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: false,
      position: 1,
      url: 'website/item2',
    },
  };
  const newGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item One',
      isHero: false,
      position: 1,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: false,
      position: 0,
      url: 'website/item2',
    },
  };

  const result = getActionsFromChanges(oldGallery, newGallery);

  expect(result.length).toEqual(2);

  expect(result[0]).toStrictEqual<SetPositionAction>({
    kind: ActionKinds.SetPosition,
    itemBlobName: 'item1',
    newPosition: newGallery['item1'].position,
  });

  expect(result[1]).toStrictEqual<SetPositionAction>({
    kind: ActionKinds.SetPosition,
    itemBlobName: 'item2',
    newPosition: newGallery['item2'].position,
  });
});

test('set isHero actions will only appear for items that have a new isHero', async () => {
  const oldGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item One',
      isHero: false,
      position: 0,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: false,
      position: 1,
      url: 'website/item2',
    },
  };
  const newGallery: BlobNameToItemMap = {
    item1: {
      blobName: 'item1',
      displayName: 'Item One',
      isHero: false,
      position: 0,
      url: 'website/item1',
    },
    item2: {
      blobName: 'item2',
      displayName: 'Item Two',
      isHero: true,
      position: 1,
      url: 'website/item2',
    },
  };

  const result = getActionsFromChanges(oldGallery, newGallery);

  expect(result.length).toEqual(1);

  expect(result[0]).toStrictEqual<SetIsHeroAction>({
    kind: ActionKinds.SetIsHero,
    itemBlobName: 'item2',
    newIsHero: newGallery['item2'].isHero,
  });
});
