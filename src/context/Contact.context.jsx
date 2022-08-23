import { createContext, useReducer } from "react";



// create a context
export const ContactContext = createContext();


const initialContacts = [
    {
      "id": '1',
      "first_name": "Ingaborg",
      "last_name": "Kimberley",
      "email": "ikimberley0@goo.ne.jp",
      "gender": "female",
      "profession": "Structural Engineer",
      "image": "https://robohash.org/delenitisaepedolor.png?size=200x200&set=set1",
      "dob": "16/05/2022",
      "bio": "et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum"
    },
    {
      "id": '2',
      "first_name": "Corbett",
      "last_name": "Crossman",
      "email": "ccrossman1@upenn.edu",
      "gender": "male",
      "profession": "Senior Quality Engineer",
      "image": "https://robohash.org/rationenatuseum.png?size=200x200&set=set1",
      "dob": "30/01/2022",
      "bio": "maecenas ut massa quis augue luctus tincidunt nulla mollis molestie"
    },
    {
      "id": '3',
      "first_name": "Edithe",
      "last_name": "Bleby",
      "email": "ebleby2@europa.eu",
      "gender": "female",
      "profession": "Dental Hygienist",
      "image": "https://robohash.org/autiureoccaecati.png?size=200x200&set=set1",
      "dob": "29/08/2021",
      "bio": "nulla mollis molestie lorem quisque ut erat curabitur gravida nisi"
    },
    {
      "id": '4',
      "first_name": "Teena",
      "last_name": "Picard",
      "email": "tpicard3@weather.com",
      "gender": "female",
      "profession": "Assistant Professor",
      "image": "https://robohash.org/earumsapientecumque.png?size=200x200&set=set1",
      "dob": "15/10/2021",
      "bio": "augue aliquam erat volutpat in congue etiam justo etiam pretium"
    },
    {
      "id": '5',
      "first_name": "Colin",
      "last_name": "Matskevich",
      "email": "cmatskevich4@gov.uk",
      "gender": "male",
      "profession": "Tax Accountant",
      "image": "https://robohash.org/eossedharum.png?size=200x200&set=set1",
      "dob": "23/06/2022",
      "bio": "rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas"
    },
    {
      "id": '6',
      "first_name": "Lazarus",
      "last_name": "Couvet",
      "email": "lcouvet5@thetimes.co.uk",
      "gender": "male",
      "profession": "Data Coordiator",
      "image": "https://robohash.org/solutaeostemporibus.png?size=200x200&set=set1",
      "dob": "15/04/2022",
      "bio": "sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus"
    },
    {
      "id": '7',
      "first_name": "Ruy",
      "last_name": "Volk",
      "email": "rvolk6@addthis.com",
      "gender": "male",
      "profession": "Design Engineer",
      "image": "https://robohash.org/quisdoloremquedoloribus.png?size=200x200&set=set1",
      "dob": "30/03/2022",
      "bio": "eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor"
    },
    {
      "id": '8',
      "first_name": "Caroljean",
      "last_name": "Malloch",
      "email": "cmalloch7@1688.com",
      "gender": "female",
      "profession": "Computer Systems Analyst I",
      "image": "https://robohash.org/omnisveniameaque.png?size=200x200&set=set1",
      "dob": "20/07/2022",
      "bio": "felis donec semper sapien a libero nam dui proin leo odio"
    },
    {
      "id": '9',
      "first_name": "Lorette",
      "last_name": "Olexa",
      "email": "lolexa8@istockphoto.com",
      "gender": "female",
      "profession": "Quality Control Specialist",
      "image": "https://robohash.org/fugitevenietet.png?size=200x200&set=set1",
      "dob": "28/08/2021",
      "bio": "tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet"
    },
    {
      "id": '10',
      "first_name": "Rhona",
      "last_name": "Ewebank",
      "email": "rewebank9@wsj.com",
      "gender": "female",
      "profession": "Administrative Assistant III",
      "image": "https://robohash.org/quasiaspernaturaccusantium.png?size=200x200&set=set1",
      "dob": "15/02/2022",
      "bio": "sem fusce consequat nulla nisl nunc nisl duis bibendum felis"
    }
  ]


const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';

const contactsReducer = (state, action) => {

  const {type, payload} = action;
  
  switch (type) {
    case ADD_CONTACT:
      return [contact, ...state];
  
    case UPDATE_CONTACT:
      const updatedContact = state.map(contact => {
        if(contact.id === payload.id) {
            return payload;
        } else {
            return contact;
        }
      })
      return [...updatedContact];
  
    case DELETE_CONTACT:
      const filteredContacts = state.filter(contact => contact.id !== payload);
      return [...filteredContacts];

    default:
      return state;
  }
}
  
// create a provider
export const ContactProvider = ({children}) => {

    // const [contacts, setContacts] = useState(initialContacts);
    const [contacts, dispatch] = useReducer(contactsReducer, initialContacts);

    const addContact = (contact) => {
        // setContacts([contact, ...contacts]);
        dispatch({type: ADD_CONTACT, payload: contact});
    }

    const updateContact = (updatedContactValue) => {
    
        // const contactWithUpdate = contacts.map(contact => {
        // if(contact.id === updatedContactValue.id) {

        //     return updatedContactValue;

        // } else {
        //     return contact;
        // }
        // })

        // setContacts(contactWithUpdate);


        dispatch({type: UPDATE_CONTACT, payload: updatedContactValue});
    }

    const deleteContact = (id) => {

        // const filteredContacts = contacts.filter(contact => contact.id !== id);
        // setContacts(filteredContacts);
        dispatch({type: DELETE_CONTACT, payload: id});
    }

    const value = {
        contacts,
        addContact,
        updateContact,
        deleteContact
    }

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    )
}



























