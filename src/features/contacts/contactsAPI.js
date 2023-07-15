import qs from "qs";
import { apiSlice } from "../api/apiSlice";

export const contactsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getContacts: builder.query({
        query: (page) => {
          const query = qs.stringify(
            {
              sort: ["id:desc"],
              populate: "*",
              pagination: {
                page,
                pageSize: import.meta.env.VITE_PAGE_SIZE,
              },
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          );

          return `/contacts?${query}`;
        },
        providesTags: (result, error, page) => result
        ? [
            // Provides a tag for each post in the current page,
            // as well as the 'PARTIAL-LIST' tag.
            ...result.data.map(({ id }) => ({ type: 'Posts', id })),
            { type: 'Posts', id: 'PARTIAL-LIST' }
          ]
        : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
      }),
      addContact: builder.mutation({
        query: (contact) => {
          const { image, ...restData } = contact;
          const formData = new FormData();
          formData.append("files.image", image[0], image[0]?.name);
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/contacts`,
            method: "POST",
            body: formData,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
          try {

            const { page } = getState()?.contact;
            const result = await queryFulfilled;
            const pageSize = import.meta.env.VITE_PAGE_SIZE;
            
            dispatch(
              apiSlice.util.updateQueryData(
                "getContacts",
                page,
                (draftContacts) => {
                  
                  let contacts = [ ...draftContacts?.data ];
                  let removedContact = null;
                  if(contacts.length < pageSize) {
                    contacts.unshift(result?.data?.data);
                  } else {
                    contacts.pop();
                    contacts.unshift(result?.data?.data);
                  }
                  
                  const page = draftContacts.meta.pagination.page;
                  const total = draftContacts.meta.pagination.total + 1;
                  const pageCount = Math.ceil(total / pageSize);
                  
                  draftContacts.data = [ ...contacts ];
                  draftContacts.meta.pagination = {
                    page,
                    total,
                    pageSize,
                    pageCount
                  }
                 
                }
              )
            );
          } catch (error) {}
        },
      }),
      getContact: builder.query({
        query: (contactId) => `/contacts/${contactId}?populate=*`,
      }),
      updateContact: builder.mutation({
        query: (data) => {
          const { image, contactId, ...restData } = data;
          const formData = new FormData();
          if (image.length) {
            formData.append("files.image", image[0], image[0]?.name);
          }
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/contacts/${contactId}`,
            method: "PUT",
            body: formData,
          };
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
          try {
            const result = await queryFulfilled;
            const { page } = getState()?.contact;

            // update /contacts/:id data
            dispatch(
              apiSlice.util.updateQueryData(
                "getContact",
                arg?.contactId.toString(),
                (draftContact) => result?.data
              )
            );

            // update /contacts data
            dispatch(
              apiSlice.util.updateQueryData(
                "getContacts",
                page,
                (draftContacts) => {
                  const foundContact = draftContacts?.data.find(
                    (contact) => contact.id == result?.data?.data?.id
                  );
                  foundContact.attributes = result?.data?.data?.attributes;
                }
              )
            );
          } catch (error) {}
        },
      }),
      deleteContact: builder.mutation({
        query: (contactId) => ({
          url: `/contacts/${contactId}`,
          method: "DELETE",
        }),
        async onQueryStarted(contactId, { queryFulfilled, dispatch, getState }) {
          try {
            const result = await queryFulfilled;
            const {page} = getState()?.contact;

            // update /contacts data cache
            dispatch(
              apiSlice.util.updateQueryData(
                "getContacts",
                page,
                (draftContacts) => {

                  const filteredContacts = draftContacts?.data.filter(
                    (contact) => contact.id !== contactId
                  );

                  draftContacts.data = filteredContacts;
                }
              )
            );

          } catch (error) {}
        },
        invalidatesTags: (result, error, id) => [
          { type: 'Posts', id },
          { type: 'Posts', id: 'PARTIAL-LIST' },
        ],
      }),
    };
  },
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsAPI;
