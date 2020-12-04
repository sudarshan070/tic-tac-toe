import Landing from './components/Landing'
import Game from './components/player/Game'
import TicTacToe from './components/ai/Tic-Tac-Toe'
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter >
      <Route  exact path='/' component={Landing} />

      <Route path='/friend' component={Game} />

      <Route path='/ai' component={TicTacToe} />

    </BrowserRouter>
  );
}

export default App;
