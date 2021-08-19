import {ItemCollectionType} from 'src/rendererContext/features/galleryActions/galleryActionsHelpers';
import {LocalGalleryItem} from './GalleryItems';

export const enum ActionKinds {
  Rename,
  Delete,
  SetPosition,
  SetIsHero,
  CreateItem,
}

export type GalleryActions = (
  | RenameAction
  | SetPositionAction
  | SetIsHeroAction
  | CreateItemAction
  | DeleteItemAction
)[];

export interface BaseAction {
  itemBlobName: string;
}

export interface RenameAction extends BaseAction {
  kind: ActionKinds.Rename;
  newDisplayName: string;
}

export interface SetPositionAction extends BaseAction {
  kind: ActionKinds.SetPosition;
  newPosition: number;
}

export interface SetIsHeroAction extends BaseAction {
  kind: ActionKinds.SetIsHero;
  newIsHero: boolean;
}

export interface CreateItemAction extends BaseAction {
  kind: ActionKinds.CreateItem;
  itemToCreate: LocalGalleryItem;
}

export interface DeleteItemAction extends BaseAction {
  kind: ActionKinds.Delete;
}

export interface RepositionItemsAction {
  oldIndex: number;
  newIndex: number;
  collection: ItemCollectionType;
}

// export interface RenameGalleryItemResponse {
//   renamedItem: IGalleryItem;
// }
