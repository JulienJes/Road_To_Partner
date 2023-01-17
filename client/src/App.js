import Index from './components/routes';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

fetch("http://localhost:5000/api/edition/")
  .then((res) => {
    return res.json()
  })
  .then((result) => {
    console.log(result)
  })

function App() {
  return (
    <>
    <Header />
    <main>
      <div className="container">
        <Index />
      </div>
    </main>
    <Footer />
    </>
  );
};

export default App;