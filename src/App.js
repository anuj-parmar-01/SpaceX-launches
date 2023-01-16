
import './App.css';
import LaunchTable from './Components/Table';
import Modal from './Components/Modal';
import Spacex from './Components/Spacex.png'


function App() {
  return (
    <>
      <div className='spacex_img'>
        <img src={Spacex} alt='spacex' />
      </div>
      <hr style={{ borderTop: '2px solid lightgrey' }} />
      <LaunchTable />
    </>
  );
}

export default App;
