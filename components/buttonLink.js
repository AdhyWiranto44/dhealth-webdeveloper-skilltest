import Link from "next/link";

export default function ButtonLink(props) {
  return (
    <Link href={props.href}>
      <a className="btn btn-salmon fw-bold mb-3">{props.buttonName}</a>
    </Link>
  )
}