import React from 'react';
import { RenderContainer } from './components/renderContainer.tsx';

function App() {
  return (
    <div className="App">
      <RenderContainer>
        <button onClick={async () => {
          fetch('https://httpbin.org/get')
            .then(response => { debugger
              console.log(response)
            })
            .catch(console.log);
        }}>Clique aqui</button>
      </RenderContainer>
    </div>
  );
}

export default App;
