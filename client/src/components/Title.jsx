

export const Title = ({ subtitle, title }) => {
  return (
    <div className="text-orange-500 text-center" >
      <h3 className="text-xl tracking-wider uppercase text-gray-800">{subtitle}</h3>
      <h2 className="text-xl mt-5 mb-5  font-semibold md:text-3xl">{title}</h2>
    </div>
  );
};



