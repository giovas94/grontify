import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import '../imports/startup/client';

import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

import { renderRoutes } from '../imports/startup/client/routes.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});
