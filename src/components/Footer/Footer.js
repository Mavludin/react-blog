import styles  from "./Footer.module.css";

export const Footer = ({ year }) => {
  return (
    <footer>
      <span>© React Blog - {year}</span>
    </footer>
  );
};
