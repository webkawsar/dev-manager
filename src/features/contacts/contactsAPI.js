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
            })
        }
    }
});

// export const assignmentsAPI = apiSlice.injectEndpoints({
//   endpoints: (builder) => {
//     return {
//       getAssignments: builder.query({
//         query: () => `/assignments`,
//       }),
//       addAssignment: builder.mutation({
//         query: (data) => ({
//           url: `/assignments`,
//           method: "POST",
//           body: data,
//         }),
//         async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//           try {
//             const { data } = await queryFulfilled;
//             dispatch(
//               apiSlice.util.updateQueryData(
//                 "getAssignments",
//                 undefined,
//                 (drafts) => {
//                   drafts.push(data);
//                 }
//               )
//             );
//           } catch (error) {}
//         },
//       }),
//       getAssignment: builder.query({
//         query: (id) => `/assignments/${id}`,
//       }),
//       editAssignment: builder.mutation({
//         query: ({ id, data }) => ({
//           url: `/assignments/${id}`,
//           method: "PATCH",
//           body: data,
//         }),
//         async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//           try {
//             const { data } = await queryFulfilled;

//             dispatch(
//               apiSlice.util.updateQueryData(
//                 "getAssignments",
//                 undefined,
//                 (drafts) => {
//                   const updatedCacheData = drafts.find(
//                     (assignment) => assignment?.id == arg?.id
//                   );
//                   updatedCacheData.title = data?.title;
//                   updatedCacheData.video_id = data?.video_id;
//                   updatedCacheData.video_title = data?.video_title;
//                   updatedCacheData.totalMark = data?.totalMark;
//                 }
//               )
//             );

//             dispatch(
//               apiSlice.util.updateQueryData(
//                 "getAssignment",
//                 arg?.id,
//                 (draft) => {
//                   draft.title = data?.title;
//                   draft.video_id = data?.video_id;
//                   draft.video_title = data?.video_title;
//                   draft.totalMark = data?.totalMark;
//                 }
//               )
//             );
//           } catch (error) {}
//         },
//       }),
//       deleteAssignment: builder.mutation({
//         query: (id) => ({
//           url: `/assignments/${id}`,
//           method: "DELETE",
//         }),
//         async onQueryStarted(id, { queryFulfilled, dispatch }) {
//           try {
//             const { data } = await queryFulfilled;

//             dispatch(
//               apiSlice.util.updateQueryData(
//                 "getAssignments",
//                 undefined,
//                 (drafts) => {
//                   const filteredAssignments = drafts.filter(
//                     (assignment) => assignment.id != id
//                   );
//                   return filteredAssignments;
//                 }
//               )
//             );
//           } catch (error) {}
//         },
//       }),
//     };
//   },
// });

export const {
  useGetContactsQuery
} = contactsAPI;