import React, {useState} from 'react';
import {ButtonToolbar, Button, Modal} from 'rsuite';

export default function ItemUploader(): JSX.Element {
  const [shown, setShown] = useState(false);

  function open() {
    setShown(true);
  }

  function close() {
    setShown(false);
  }

  return (
    <div className="modal-container">
      <Button size="lg" onClick={open}>
        Upload
      </Button>
      <Modal full show={shown} onHide={close}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>test</p>
          <input type="file" onChange={(e) => console.log(e.target.files)}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} appearance="primary">
            Ok
          </Button>
          <Button onClick={close} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
