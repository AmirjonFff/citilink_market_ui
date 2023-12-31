import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { providesList } from "./index";

export const categoriesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => "categories",
      providesTags: (result) => providesList(result, "Category"),
    }),
    addCategory: build.mutation({
      query: (body) => ({
        url: "categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    editCategory: build.mutation({
      query: ({ id, ...body }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
