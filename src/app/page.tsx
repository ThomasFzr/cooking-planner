import Searchbar from "@/components/Searchbar/Searchbar";

const imagesUrl = {
  'poulet': '/images/chicken.png',
  'pizza': "/images/pizza.png",
  'végétarien': "/images/vege.png",
  'dessert': "/images/dessert.png"
};

export const Page = () => {
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[50%]">
        <h1>LES MEILLEURES RECETTES</h1>
        <div className="flex flex-row items-center justify-center">
          {Object.entries(imagesUrl).map(([key, url], index) => (
            <div className="flex flex-col bg-[#FEE4CC] border rounded-full h-48 items-center justify-center m-2 " key={index}>
              <div className="h-24 w-24 rounded-full hover:bg-[#FEE4CC] flex items-center justify-center shadow m-2">
                <img className="h-24 rounded-full" src={url} alt={`Image of ${key}`} />
              </div>
              <span>{key.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <div>
          <Searchbar />
        </div>
      </div>
      <div className="w-[50%]">
        <div className="h-132 w-132 ml-22 absolute z-[-1] rounded-full bg-[#FEE4CC] flex items-center justify-center shadow m-2"/>
        <div className="h-100 w-100 ml-22 mt-18 absolute z-[-1] rounded-full bg-[#FA94A8] flex items-center justify-center shadow m-2"/>
        <img className="h-128" src='/images/meal.png'></img>
      </div>
    </div>
  );
}
export default Page;