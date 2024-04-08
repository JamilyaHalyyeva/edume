

export const MoreInfo = () => {
    const homeAbout = [
        {
          id: 1,
          cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/vocabulary_trainer/blobby_with_headphones-4b1b6060873ff4d73bf09640780435e08de98fbccf8cf18059bd8ed6fcffbef1.png",
          title: "Learning Is fun...",
          description: "With videos and innovative exercise formats.you have added your vocabulary? Then let's get started! The application is very easy to use and will be explained step by step. You don't have to worry about anything and can fully focus on your vocabulary.",
        },
        {
          id: 2,
          cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/vocabulary_trainer/blobby_with_rope-ab32b68f58eab65e146576f23f70245130ada41412428d571b65d936e77410d0.png",
          title: "The right thing for everyone",
          description: "Assign content in a differientiated and targeted Manner. Our vocabulary trainer knows which vocabulary you should practice when and remembers your learning progress. It will repeat learned vocabulary with you at specific intervals to help them stay in your long-term memory",
        },
        {
          id: 3,
          cover: "https://assets.production.cdn.sofatutor.net/assets/application/information/vocabulary_trainer/blobby_with_cup-a0eac53bdb0afc948cc1a615f607d1ab1a4f8cc48ea51cb7f08a7d193819180a.png",
          title: "Save work and time.",
          description: "More time for the essential. Are you bored of learning vocabulary? Not anymore! Diverse tasks, images, and audio examples bring entertainment into your school day. This way, you not only learn with multiple senses but also remember the vocabulary much better.",
        }
      ];

  return (
    <>
    <section >
 
     

    <div className="flex justify-around w-70 max-w-screen-lg mx-auto  mt-12 mb-10 p-6 ">
        <div className="w-full ml-20 p-6 items-center"> {/* Adjusted width of the grid container */}
            <div className="justify-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mr-6 space-x-3 ">
                {homeAbout.map((item, index) => (
                    <div key={index} className=" ">
                        <div className="flex flex-col items-center w-70 ">
                            <img src={item.cover} alt="" className="w-42 h-40 mb-2 md:full object-contain" />
                            <h2 className="font-semibold text-lg text-gray-700">{item.title}</h2>
                            <h3 className="text-sm font-light text-gray-600 hidden md:block">{item.description}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </section>


    </>
  )
}
