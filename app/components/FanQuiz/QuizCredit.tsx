import { Link } from "@remix-run/react";

export default function QuizCredit() {
  return (
    <footer>
      made by{" "}
      <Link to="https://about.hellogirls.info" rel="noreferrer" target="_blank">
        son
      </Link>
    </footer>
  );
}
