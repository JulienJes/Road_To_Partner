import Index from './components/routes';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
    <Header />
    <main>
      <div className="main-container">
        <Index />
      </div>
    </main>
    <Footer />
    </>
  );
};

export default App;