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
                }
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
              query: (contactId) => `/contacts/${contactId}?populate=*`
            }),
            updateContact: builder.mutation({
              query: ({ contactId, data }) => ({
                url: `/contacts/${contactId}`,
                method: 'PUT',
                body: data
              })
            })
        }
    }
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation
} = contactsAPI;