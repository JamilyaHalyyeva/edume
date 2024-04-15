export const Slogan = () => {
  return (
    <div className="flex justify-center mt-20 px-4 pt-10 gap-8 max-w-screen-lg  flex-col md:flex-row  mx-auto">
      <h1 className="text-3xl font-normal text-center text-gray-800 bg-orange-100 rounded-2xl shadow-md p-4 pt-10  md:text-xl md:w-1/2 md:line-height-10">
        Empowering Success Online with Engaging Teachers,
        <br /> Fun Learning, and Achievable Goals!
        <br />
        <br />
        <span className="text-base ">
          At Edume, we are dedicated to revolutionizing your online learning
          experience.
          <br />
          <br />
          Our team of passionate educators is committed to providing engaging,
          interactive lessons tailored to your needs. With Edume, learning is
          not just about gaining knowledge it is about having fun along the way!
          <br />
          <br />
        </span>
      </h1>

      <div className="img">
        <img
          src="https://assets.production.cdn.sofatutor.net/assets/application/welcome/features/vocab_trainer_home-c455260e26f5803bc06a43553e99da1391d89a21a8146604726d40214d1187c7.svg"
          alt=""
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};
