import configureStore from 'redux-mock-store';
import thunk from "redux-thunk"; 
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {}

let store = mockStore( initialState );
store.dispatch = jest.fn();


const note = {
  id: 19,
  date: 0,
  title: 'titulotest',
  body: 'bodytest',
  url: 'https://urltest.com/tes.jpg'
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note} />
  </Provider>
);



describe('Tests on JournalEntry component', () => {
  
  test('should show correctly', () => {
    expect( wrapper ).toMatchSnapshot();
  });
  

  test('should active the note', () => {

    // otra forma de evaluar sin el mock
    wrapper.find('.journal__entry').simulate('click', {});
    expect( store.dispatch ).toHaveBeenCalledWith(
      activeNote( note.id, {...note} )
    );

  });
  
});
