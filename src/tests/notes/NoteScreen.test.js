import configureStore from 'redux-mock-store';
import thunk from "redux-thunk"; 
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { NoteScreen } from '../../components/notes/NoteScreen';
import { activeNote } from '../../actions/notes';


jest.mock('../../actions/notes', () => ({
  activeNote: jest.fn()
}));

// jest.mock("../../../actions/notes", () => ({
//   startNewNote: jest.fn()
// }));


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
  auth: {
    uid: '1',
    name: 'mauro'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 1232,
      title: 'tituloTest',
      body: 'bodyTest',
      date: 0
    },
    notes: []
}
} 

let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);


describe('Tests on NoteScreen component', () => {
  
  test('should show correctly', () => {
    expect( wrapper ).toMatchSnapshot();
  });
  

  test('should activeNote', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'hola'
      }
    });

    expect( activeNote ).toHaveBeenLastCalledWith(
      1232,
      {
        id: 1232,
        title: 'hola',
        body: 'bodyTest',
        date: 0
      }
    );
  });
  

});
