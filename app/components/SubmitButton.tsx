/* eslint-disable no-undef */
interface SubmitButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button 
      type="submit" 
      onClick={props.onClick}
      disabled={props.disabled}
      className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
    >
      {props.children}
    </button>
  )
}

export default SubmitButton