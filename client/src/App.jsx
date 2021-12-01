import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Movie from './pages/movie/Movie';
import TopBar from './components/topBar/TopBar';
import './App.scss';
const App = () => {
    return (
        <Router>
            <Switch>
                <>
                    <TopBar />
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/movie/:slug">
                        <Movie />
                    </Route>
                </>
            </Switch>
        </Router>
    );
};

export default App;
