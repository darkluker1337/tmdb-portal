import { Provider } from 'react-redux';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { store } from './components/redux/Store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './components/Error/ErrorHandler';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Provider store={store}>
        <NavBar />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
