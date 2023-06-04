import qs from "qs";
import { apiSlice } from "../api/apiSlice";

export const contactsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => {
        return {
            getContacts: builder.query({
                query: () => {
                    const query = qs.stringify(
                        {
                          sort: ["id:desc"],
                          populate: "*",
                          pagination: {
                            page: 1,
                            pageSize: import.meta.env.VITE_PAGE_SIZE,
                          },
                        },
                        {
                          encodeValuesOnly: true, // prettify URL
                        }
                    );
                    
                    return `/contacts?${query}`
                },
                providesTags: ['Contacts']
            }),
            addContact: builder.mutation({
              query: (contact) => {

                const { image, ...restData } = contact;
                const formData = new FormData();
                formData.append("files.image", image[0], image[0]?.name);
                formData.append("data", JSON.stringify(restData));
          
                return {
                  url: `/contacts`,
                  method: 'POST',
                  body: formData
                }
              },
              async onQueryStarted(arg, { queryFulfilled, dispatch }){
                try {

                  const result = await queryFulfilled;
                  dispatch(apiSlice.util.updateQueryData("getContacts", undefined, (draftContacts) => {
                    draftContacts?.data.unshift(result?.data?.data);
                  }))
                  
                } catch (error) {
                  
                }
              }
            }),
            getContact: builder.query({
              query: (contactId) => `/contacts/${contactId}?populate=*`,
              providesTags: (result, error, arg) => [{ id: arg, type: 'Contact' }]
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
                  method: 'PUT',
                  body: formData
                }
              },
              invalidatesTags: (result, error, arg) => ['Contacts', { id: arg.contactId, type: 'Contact' }]
            }),
            deleteContact: builder.mutation({
              query: (contactId) => ({
                url: `/contacts/${contactId}`,
                method: 'DELETE'
              }),
              invalidatesTags: ['Contacts']
            })
        }
    }
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation
} = contactsAPI;