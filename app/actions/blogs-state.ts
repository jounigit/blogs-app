export type BlogFormValues = {
  title: string
  author: string
  url: string
}

export type BlogFormState = {
  errors: Partial<Record<keyof BlogFormValues | "form", string>>
  values: BlogFormValues
}

export const initialState: BlogFormState = {
  errors: {},
  values: { title: "", author: "", url: "" },
}
