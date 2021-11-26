import React from 'react';
import {Header} from "../p1-header/Header";
import {Redirect, Route, Switch} from "react-router-dom";
import {RegistrationContainer} from "../../../n2-features/f1-auth/a2-register/RegistrationContainer";
import {Profile} from "../../../n2-features/f1-auth/a3-profile/Profile";
import {Page404} from "../../../n2-features/f1-auth/Page404";
import {PasswordRecovery} from "../../../n2-features/f1-auth/a3-passwordRecovery/PasswordRecovery";
import {PasswordNew} from "../../../n2-features/f1-auth/a4-passwordNew/PasswordNew";
import {Examples} from "../../../n2-features/f0-test/Examples/Examples";
import {LoginContainer} from "../../../n2-features/f1-auth/a1-login/LoginContainer";
import {Table} from "../../../n2-features/f2-table/Table";
import Cards from "../../../n2-features/f2-table/TableContent/Cards";

export const Main = () => {
    return (
        <div>
            <Header/>
            <Switch>
                <Route path={'/table/'} render={() => <Table />}/>
                <Route path={'/cards/:packid?'} render={() => <Cards />}/>
                <Route exact path={'/login'} render={() => <LoginContainer/>}/>
                <Route exact path={'/registration'} render={() => <RegistrationContainer/>}/>
                <Route exact path={'/profile'} render={() => <Profile/>}/>
                <Route exact path={'/404'} render={() => <Page404/>}/>
                <Route exact path={'/passwordrecovery'} render={() => <PasswordRecovery/>}/>
                <Route exact path={'/passwordnew/:token'} render={() => <PasswordNew/>}/>
                <Route exact path={'/tests'} render={() => <Examples/>}/>
                <Redirect exact from={'/'} to={'/profile'}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}