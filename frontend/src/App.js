import {Routes,Route} from 'react-router-dom'
import Screen1 from './Screens/Screen1';
import Screen2 from './Screens/Screen2';

function App() {
  return (
    <>
    <Routes>
       <Route exact path ="/screen1" element={<Screen1/>}/>
       <Route exact path ="/screen2" element={<Screen2/>}/>
     </Routes>
    </>
  );
}

export default App;
