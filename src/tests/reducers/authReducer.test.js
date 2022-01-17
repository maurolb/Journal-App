
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Tests on reducers authReducer', () => {

  const initialState = {
    name: 'pepito',
    pass: 'asd123'
  };

  
  test('case default should return default state', () => {
    const action = {
      type: null  
    };
    const reducer  = authReducer( initialState, action );
    expect( reducer ).toEqual( initialState );
  });
  

  test('case logot should return an empty object', () => {
    const action = {
      type: types.logout  
    };
    const reducer = authReducer( initialState, action );
    expect( reducer ).toEqual({});
  });
  

  test('case login should return uid & name', () => {
    const action = {
      type: types.login,
      payload: {
        uid: 'dasdjasi23213218942',
        displayName: 'pepito perez'
      }
    }
    const reducer = authReducer( {}, action );

    expect( reducer ).toEqual({
      uid: 'dasdjasi23213218942',
      name: 'pepito perez'
    });

  });
  
});
