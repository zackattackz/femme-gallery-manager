import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Button,
  FlexboxGrid,
  Icon,
  IconButton,
  Input,
  List,
  Modal,
  Panel,
  Grid,
  Row,
  Col,
} from 'rsuite';
import {ActionKinds} from 'src/types/GalleryActions';
import {GalleryItem, isLocalGalleryItem} from 'src/types/GalleryItems';
import {ItemCollectionType} from './galleryActionsHelpers';
import {deleteItem, renameItem, repositionItems} from './galleryActionsSlice';

interface GalleryItemActionsProps {
  item: GalleryItem;
  collectionLength: number;
  collectionType: ItemCollectionType;
}

export default function GalleryItemActions(props: GalleryItemActionsProps): JSX.Element {
  const dispatch = useDispatch();
  const [renameInputValue, setRenameInputValue] = useState(props.item.displayName);
  const [shown, setShown] = useState(false);

  function open() {
    setShown(true);
  }

  function close() {
    setShown(false);
  }

  const itemImage = isLocalGalleryItem(props.item) ? null : (
    <img style={{width: '300px'}} src={props.item.url} />
  );

  return (
    <Grid fluid>
      <Row>
        <Col sm={1}>
          <Row style={{marginBottom: '5px'}}>
            <Button
              disabled={props.item.position === 0}
              color={'cyan'}
              block
              size={'sm'}
              ripple={false}
	      onClick={() => 
	        dispatch(repositionItems({newIndex: props.item.position-1 , oldIndex: props.item.position, collection: props.collectionType}))
	      }
            >
              <Icon icon="up" />
            </Button>
          </Row>
          <Row>
            <Button
              disabled={props.item.position === props.collectionLength - 1}
              color={'cyan'}
              block
              size={'sm'}
              ripple={false}
	      onClick={() => 
	        dispatch(repositionItems({newIndex: props.item.position+1 , oldIndex: props.item.position, collection: props.collectionType}))
	      }
            >
              <Icon icon="down" />
            </Button>
          </Row>
        </Col>
        <Col sm={23}>
          <Panel header={props.item.displayName} collapsible bordered>
            { <Button
            color={'red'}
            onClick={() =>
              dispatch(deleteItem({kind: ActionKinds.Delete, itemBlobName: props.item.blobName}))
            }
          >
            Delete
          </Button> }

            {itemImage}
          </Panel>
        </Col>
      </Row>
    </Grid>
    // <FlexboxGrid justify="space-between">
    //   <FlexboxGrid.Item colspan={5}>{props.item.displayName}</FlexboxGrid.Item>
    //   <FlexboxGrid.Item colspan={4}>
    //     <Button style={{float: 'right'}} color={'blue'} onClick={open}>
    //       Details
    //     </Button>
    //     <Modal full show={shown} onHide={close}>
    //       <Modal.Header>
    //         <Modal.Title>{props.item.displayName}</Modal.Title>
    //       </Modal.Header>
    //       <Modal.Body>
    //         <p>test</p>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <Button
    //           color={'red'}
    //           onClick={() =>
    //             dispatch(deleteItem({kind: ActionKinds.Delete, itemBlobName: props.item.blobName}))
    //           }
    //         >
    //           Delete
    //         </Button>
    //         <Button onClick={close} appearance="subtle">
    //           Close
    //         </Button>
    //       </Modal.Footer>
    //     </Modal>
    //   </FlexboxGrid.Item>
    //   {/* <FlexboxGrid.Item colspan={12}>
    //     <FlexboxGrid>
    //       <FlexboxGrid.Item colspan={8}>
    //         <Button
    //           color={'red'}
    //           onClick={() =>
    //             dispatch(deleteItem({kind: ActionKinds.Delete, itemBlobName: props.item.blobName}))
    //           }
    //         >
    //           Delete
    //         </Button>
    //       </FlexboxGrid.Item>
    //       <FlexboxGrid.Item colspan={16}>
    //         <Input
    //           type="text"
    //           onChange={(v) => setRenameInputValue(v)}
    //           onPressEnter={() =>
    //             dispatch(
    //               renameItem({
    //                 itemBlobName: props.item.blobName,
    //                 kind: ActionKinds.Rename,
    //                 newDisplayName: renameInputValue,
    //               })
    //             )
    //           }
    //           value={renameInputValue}
    //         />
    //       </FlexboxGrid.Item>
    //     </FlexboxGrid>
    //   </FlexboxGrid.Item> */}
    // </FlexboxGrid>
  );
}
