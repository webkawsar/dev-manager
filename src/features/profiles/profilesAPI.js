import qs from "qs";
import { apiSlice } from "../api/apiSlice";

export const profilesAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUserProfile: builder.query({
        query: (data) => {
          const query = qs.stringify(
            {
              populate: [
                "contacts",
                "profile",
                "profile.profilePicture",
                "contacts.author",
                "contacts.image",
              ],
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          );

          return `/users/me?${query}`;
        },
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            // dispatch(userProfile(result?.data?.profile));
          } catch (error) {}
        },
      }),
      createUserProfile: builder.mutation({
        query: (data) => {
          const { profilePicture, ...restData } = data;

          const formData = new FormData();
          if (profilePicture.length) {
            formData.append(
              "files.profilePicture",
              profilePicture[0],
              profilePicture[0]?.name
            );
          }
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/profiles`,
            method: "POST",
            body: formData,
          };
        },
      }),
      updateUserProfile: builder.mutation({
        query: ({ id, data }) => {
          const { profilePicture, ...restData } = data;

          const query = qs.stringify(
            {
              populate: "*",
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          );

          const formData = new FormData();
          if (profilePicture.length) {
            formData.append(
              "files.profilePicture",
              profilePicture[0],
              profilePicture[0]?.name
            );
          }
          formData.append("data", JSON.stringify(restData));

          return {
            url: `/profiles/${id}`,
            method: "PUT",
            body: formData,
          };
        },
      }),
      getUserContacts: builder.query({
        query: () => {
          
          const query = qs.stringify(
            {
              populate: [
                "contacts",
                "profile",
                "profile.profilePicture",
                "contacts.author",
                "contacts.image",
              ],
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          );

          return `/users/me?${query}`;
        }
      }),
      deleteUserContact: builder.mutation({
        query: (contactId) => ({
          url: `/contacts/${contactId}`,
          method: "DELETE",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            
            const result = await queryFulfilled;
            // remove contact from user cached data
            dispatch(
              apiSlice.util.updateQueryData(
                "getUserContacts",
                undefined,
                (draftContacts) => {
                  
                  // console.log(JSON.parse(JSON.stringify(draftContacts)), 'draftContacts')
                  const filteredContacts = draftContacts?.contacts.filter(
                    (contact) => contact.id != result?.data?.data?.id
                  );
                  draftContacts.contacts = filteredContacts;
                  
                  // draftContacts.meta.pagination.total =
                  // draftContacts.meta.pagination.total - 1;

                }
              )
            );
          } catch (error) {}
        },
      }),
    };
  },
});

export const {
  useGetUserProfileQuery,
  useCreateUserProfileMutation,
  useUpdateUserProfileMutation,
  useGetUserContactsQuery,
  useDeleteUserContactMutation
} = profilesAPI;
