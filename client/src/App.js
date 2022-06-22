import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Profile from './components/Profile';
import NavigationBar from './components/Navbar';

function App() {
  return (
    <div>
     <NavigationBar />
      <Profile/>
    </div>
  );
}

export default App;
