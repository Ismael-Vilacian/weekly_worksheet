import React from 'react';
import { RenderContainer } from './components/renderContainer.tsx';
import { MenuBar } from './components/menuBar.tsx';

function App() {
  return (
    <div className="App">
      <MenuBar></MenuBar>
      <RenderContainer>
        {/* <button onClick={async () => {
          fetch('https://zany-doodle-jwg5j7w769fg79-8000.app.github.dev/curso/',  { mode: 'no-cors' })
            .then(response => { 
              console.log(response);
            })
            .catch(console.log);
        }}>Clique aqui</button> */}
      </RenderContainer>
    </div>
  );
}

export default App;
