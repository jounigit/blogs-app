export type BlogFormValues = {
  title: string
  author: string
  url: string
}

export type BlogFormState = {
  errors: Record<string, string>,
  success: boolean,
  values: BlogFormValues,
}

export const initialState: BlogFormState = {
  errors: {},
  success: false,
  values: { title: "", author: "", url: "" },
}
