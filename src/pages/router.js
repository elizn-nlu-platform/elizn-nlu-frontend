import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppContext } from '../helpers/hooks/common-hook';
import HomePage from './home/home-page';
import SigninPage from './signin/signin-page';

const MainRouter = () => {
    const { authUserInfo, appId } = useAppContext();
    let routes;
    if (authUserInfo && appId) {
        // logged and select application
        routes = (
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/home' element={<HomePage/>} />
            </Routes>
        )
    } else if (authUserInfo) {
        // logged but still not select a application
        routes = (
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/apps' element={<HomePage/>} />
            </Routes>
        )
    } else {
        // not logged
        routes = (
            <Routes>
                <Route path='/' element={<SigninPage/>} />
                <Route path='/signin' element={<SigninPage/>} />
            </Routes>
        )
    }
    return (
        <Router>
            {routes}
        </Router>
    );
};

export default MainRouter;
