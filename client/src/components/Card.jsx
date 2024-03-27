const Card = ({ title, content, isSelected, onCardClick }) => {
  const handleOnClick = () => {
    onCardClick();
  };

  return (
    <div
      onClick={handleOnClick}
      className={`flex flex-col rounded-xl justify-center items-center overflow-hidden border-2 border-gray-300 shadow-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
        isSelected
          ? "border-orange-500  shadow-orange-300 bg-orange-100"
          : "bg-white"
      }`}
    >
      {/* Card Image (if needed) */}
      {/* <img className="w-full" src="your-image-url.jpg" alt="Card" /> */}

      <div className="p-4 ">
        {/* Card Title */}
        <div className="font-bold text-xl text-gray-800 mb-2 text-center">
          {title}
        </div>

        {/* Card Content */}
        <p className="text-orange-500 text-base font-semibold text-center">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Card;
