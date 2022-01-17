import { types } from "../../types/types";

describe('Tests on tyes', () => {
  
  test('should show correctly', () => {
    const expectedTypes = {
      login: '[Auth] Login',
      logout: '[Auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',

      uiStartLoading: '[UI] Start Loading',
      uiFinishLoading: '[UI] Finish Loading',

      notesAddNew: '[Notes] New Note',
      notesActive: '[Notes] Set Active Note',
      notesLoad: '[Notes] Load Notes',
      notesUpdate: '[Notes] Update Note Saved',
      notesDelete: '[Notes] Delete Note',
      notesLogoutCleaning: '[Notes] Logout Cleaning',
    }

    const wrapper = types
    expect( wrapper ).toEqual( expectedTypes );
  });

});
