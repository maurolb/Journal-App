import configureStore from 'redux-mock-store';
import thunk from "redux-thunk"; 

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {}

let store = mockStore( initialState );


describe('Tests on action auth', () => {
  
  beforeEach( () => {
    store = mockStore( initialState )
  });


  const user = {
    uid: 'testId',
    displayName: 'pepito'
  }


  test('login & logout should found correctly', () => {
    
    const loginAction = login( user.uid, user.displayName );
    const logoutAction = logout();

    expect( loginAction.type ).toBe( types.login);
    expect( loginAction.payload ).toEqual( user );
    
    expect( logoutAction.type ).toBe( types.logout);
  
  });
  

  test('startLogout should logout', async () => {
    
    await store.dispatch( startLogout() );

    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.logout
    });

    expect( actions[1] ).toEqual({
      type: types.notesLogoutCleaning
    });

  });


  test('should init the startLoginEmailPassword', async () => {
    
    await store.dispatch( startLoginEmailPassword('test@testing.com', 'asd123') );

    const actions = store.getActions();
    
    expect( actions[1] ).toEqual({
      type: types.login,
      payload: {
        displayName: null,
        uid: "2CWsF6CRjgNkdsFRjXbs9f8RiRH3",
      }
    });

  });
    

});
