import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import team from './team.json';
import hat from './sortinghat.svg';


const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${(props) => props.sorted ? 'gold': 'white'};
  transition: background-color 1s ease;
`;

const StyledResult = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 4em;
  justify-content: center;
  align-items: center;
`;

const StyledName = styled.div`
`;

const StyledHat = styled.img`
  width: 100px;
  cursor: pointer;

  &:hover {
    animation: spin 1s infinite;
  }

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
`;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });  
}

function Result({ person, sorted }) {
  function pickColor() {
    return Math.floor(Math.random()*16777215).toString(16);
  }

  const styles = {
    color: sorted ? 'white' : `#${pickColor()}`,
  };

  return (
    <StyledResult>
      <div style={{ whiteSpace: "pre" }}>
        {"You're a wizard"}
      </div>
      <StyledName style={styles}>
        {person}
      </StyledName>
    </StyledResult>
  );
}


function App() {
  const [selectedPerson, setSelectedPerson] = useState(undefined);
  const [sorted, setSorted] = useState(false);

  function pickSomeone() {
    return team.members[Math.floor(Math.random() * team.members.length)];
  }

  async function handleSort() {
    shuffle(team.members);
    
    setSorted(false);
    for (let i = 0; i < 40; i++) {
      setSelectedPerson(pickSomeone());
      await sleep(30 * (Math.sqrt(i)));
    }
    setSorted(true);
  }  
  
  return (
    <StyledApp sorted={sorted}>
      <StyledHat src={hat} onClick={handleSort} />
      {selectedPerson && (
        <Result person={selectedPerson} sorted={sorted}/>
      )}
    </StyledApp>
  );
}

export default App;
