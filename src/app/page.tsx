import Searchbar from "@/components/Searchbar/Searchbar";

const imagesUrl = {
  'poulet': '/images/chicken.png',
  'pizza': "/images/pizza.png",
  'végétarien': "/images/vege.png",
  'dessert': "/images/dessert.png"
};

export default function RecipesPage() {
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[50%]">
        <h1 className="text-5xl">LES MEILLEURES RECETTES</h1>
        <div className="flex flex-row items-center justify-center">
          {Object.entries(imagesUrl).map(([key, url], index) => (
            <div className="flex flex-col bg-[#FEE4CC] border rounded-full h-48 w-20 items-center justify-center m-2 " key={index}>
              <div className="h-24 w-24 rounded-full hover:bg-[#FEE4CC] flex items-center justify-center shadow m-2">
                <img className="rounded-full" src={url} alt={`Image of ${key}`} />
              </div>
              <span>{key.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <div className="w-full pl-8 pr-8">
          <Searchbar />
        </div>
      </div>  
      <div className="w-[50%] relative">
        <img className="rounded-2xl p-4" alt='image of a woman cooking' src='/images/woman2.png'/>
      </div>
    </div>
  );
}