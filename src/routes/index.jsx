import React from 'react';
import { Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Photos from '../pages/Photos';
import Page404 from '../pages/Page404';
import MyRoute from './MyRoute';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Students} />
      <MyRoute exact path="/student/:id/photos" component={Photos} isClosed />
      <MyRoute exact path="/student/:id" component={Student} isClosed />
      <MyRoute exact path="/student" component={Student} isClosed />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute exact path="/register" component={Register} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
