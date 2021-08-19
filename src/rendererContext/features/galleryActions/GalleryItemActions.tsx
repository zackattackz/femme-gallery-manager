import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, FlexboxGrid, Icon, IconButton, Input, List, Modal, Panel} from 'rsuite';
import {ActionKinds} from 'src/types/GalleryActions';
import {GalleryItem} from 'src/types/GalleryItems';
import {deleteItem, renameItem} from './galleryActionsSlice';

interface GalleryItemActionsProps {
  item: GalleryItem;
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

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={2}>
        <IconButton
          style={{display: 'block', margin: '0 auto'}}
          size={'sm'}
          icon={<Icon icon="up" />}
          ripple={false}
        />
        <Input type={'text'}></Input>
        <IconButton
          style={{display: 'block', margin: '0 auto'}}
          size={'sm'}
          icon={<Icon icon="down" />}
          ripple={false}
        />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item style={{height: '100%'}} colspan={22}>
        <Panel header={props.item.displayName} collapsible bordered>
          {/* <Button
            color={'red'}
            onClick={() =>
              dispatch(deleteItem({kind: ActionKinds.Delete, itemBlobName: props.item.blobName}))
            }
          >
            Delete
          </Button> */}
          <p>hai</p>
          <p>hai</p>
          <p>hai</p>
          <p>hai</p>
          <p>hai</p>
          <p>hai</p>
          <p>hai</p>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
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
