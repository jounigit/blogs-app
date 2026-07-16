/* eslint-disable no-undef */
interface SubmitButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  id?: string
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button 
      type="submit"
      id={props.id}
      onClick={props.onClick}
      disabled={props.disabled}
      className="bg-blue-600 w-fit text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
    >
      {props.children}
    </button>
  )
}

export default SubmitButton