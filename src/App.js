import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header.jsx';
import Button from './components/Button/Button.jsx';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList.jsx';
import Form from './components/Form/Form.jsx';

function App() {
  const {tg, onToggleButton} = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [tg])

  return (
    <>
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<ProductList/>} />
        <Route path='Form' element={<Form/>} />
      </Routes>
      <Button onClick={onToggleButton}>Toggle</Button>
    </div>
    </>
  );
}

export default App;
