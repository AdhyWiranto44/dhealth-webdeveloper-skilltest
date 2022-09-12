export default function RegularButton(props) {
  return (
    <button
      className={props.className}
      type="button"
      onClick={props.onClick}
    >
      {props.buttonName}
    </button>
  )
}