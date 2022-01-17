import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe('Tests on ui', () => {
  
  test('should', () => {
    
    const action = setError('test-error');
    
    expect( action ).toEqual({
      type: types.uiSetError,
      payload: 'test-error'
    });

    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect( removeErrorAction ).toEqual({
      type: types.uiRemoveError
    });

    expect( startLoadingAction ).toEqual({
      type: types.uiStartLoading
    });

    expect( finishLoadingAction ).toEqual({
      type: types.uiFinishLoading
    });

  });

});
