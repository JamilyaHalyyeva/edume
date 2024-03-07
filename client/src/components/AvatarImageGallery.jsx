const pngFileNames = [
  "animal1.png",
  "animal2.png",
  "animal3.png",
  "animal4.png",
  "animal5.png",
  "animal6.png",
  "animal7.png",
  "animal8.png",
  "animal9.png",
  "animal10.png",
  "animal11.png",
  "animal12.png",
  "animal13.png",
  "animal14.png",
  "animal15.png",
  "animal16.png",
  "animal17.png",
  "animal18.png",
  "animal19.png",
  "animal20.png",
  "children1.png",
  "children2.png",
  "children3.png",
  "children4.png",
  "children5.png",
  "children6.png",
  "children7.png",
  "children8.png",
  "children9.png",
  "children10.png",
  "teacher1.png",
  "teacher2.png",
  "teacher3.png",
  "teacher4.png",
  "teacher5.png",
  "teacher6.png",
  "teacher7.png",
  "teacher8.png",
  "teacher9.png",
  "teacher10.png",
];

const AvatarImageGallery = () => {
  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {pngFileNames.map((fileName, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={`./assets/images/${fileName}`} // Adjust the path accordingly
              alt={`Image ${index + 1}`}
              className="rounded-full h-16 w-16 object-cover mb-2"
            />
            <span className="text-sm text-gray-600">{fileName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarImageGallery;
