const Card = ({ title, content, isSelected, onCardClick }) => {
  const handleOnClick = () => {
    onCardClick();
  };

  return (
    <div
      onClick={handleOnClick}
      className={`max-w-xs overflow-hidden border-2 shadow-md shadow-orange-200 m-4 ${
        isSelected ? "selected-grade" : ""
      }`}
    >
      {/* Card Image (if needed) */}
      {/* <img className="w-full" src="your-image-url.jpg" alt="Card" /> */}

      <div className="px-6 py-4 flex flex-col justify-center items-center">
        {/* Card Title */}
        <div className="font-bold text-3xl text-gray-500 mb-2">{title}</div>

        {/* Card Content */}
        <p className="text-orange-400 text-base font-bold">{content}</p>
      </div>
    </div>
  );
};

export default Card;
