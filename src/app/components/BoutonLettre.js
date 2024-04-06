const BoutonLettre = ({ lettre, onClick }) => {
  return (
    <button onClick={onClick} disabled={false}>{lettre}</button>
  );
};

export default BoutonLettre;
