import React from 'react';

import { Button, Nav } from 'react-bootstrap';

export default function Header({runAstar}){

    function handleAlgo(){
        runAstar()
    }
    return(
        <Nav
        className='justify-content-center'
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Button onClick={handleAlgo}>Run Astar</Button>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

    )
}