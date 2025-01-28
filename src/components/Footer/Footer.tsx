type FooterProps = {
  year: number
}

export const Footer = ({ year }: FooterProps) => {
  return (
    <footer>
      <span>© React Blog - {year}</span>
    </footer>
  );
};
