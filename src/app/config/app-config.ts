import {InjectionToken} from '@angular/core';
import {IappConfig} from './iapp-config';

export let APP_CONFIG = new InjectionToken('app.config');
export const AppConfig: IappConfig = {
  routes: {
    error404: '404'
  },
  endpoints: {
    ticket: 'API/Ticket/',
    proc: 'API/Proc/'
  },
  errors: {
    1: 'Waiting'
  },
  status: [
    {key: 1 , val : 'Waiting for Accounts Approval'},
    {key: 2 , val : 'Waiting for HR'},
    {key: 3 , val : 'Waiting for Procurement Approval'},
    {key: 10 , val : 'Approved/Procurement need to Get ticket'},
    {key: 11 , val : 'Wait For User to Edit'},
    {key: 14 , val : 'Send Reminder to User for Edit'},
    {key: 12 , val : 'Ticket Closed'},
    {key: 13 , val : 'Ticket Closed as User did not accept'},
    {key: 15 , val : 'Ticket Closed due to no response'},
    {key: 20 , val : 'Ticket Rejected'},
    {key: 21 , val : 'Ticket Request Cancelled'},
    {key: 22 , val : 'Ticket Request Cancelled By User'}
  ],
  triptypes: [
    {'type': 'One Way', 'value': '1'},
    {'type': 'Two Way', 'value': '2'}
  ],
  userdata: [
    {'key': 'VALIDITY',
      'value': 'Validity',
    },
    {'key': 'DESTINATION_COUNTRY',
    'value': 'Destination Country',
    },
    {'key': 'TICKET_COUNT',
    'value': 'Tickets Eligible',
    }
],
  votesLimit: 3,
  topHeroesLimit: 4,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/Ismaestro/angular5-example-app'
};
