export default function RegularButton(props) {
  return (
    <button
      className="mb-3"
      type="button"
      onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  )
}