import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";

import UsersContainer from "./components/Users/UsersContainer";
//import ContentContainer from "./components/Content/ContentContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/wthSuspese";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ContentContainer = React.lazy(() => import('./components/Content/ContentContainer'));

class App extends Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized){

        return <Preloader />
        }
        return (

                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        {/* <Route path='/dialogs' component={Dialogs}/>
                    <Route path='/content' component={Content}/>*/}


                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/content/:userId?' render={withSuspense(ContentContainer)}/>




                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>

                    </div>
                </div>

        )
    }
}
const mapStateToProps =(state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp;

