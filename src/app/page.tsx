import Searchbar from "@/components/Searchbar/Searchbar";
import Image from "next/image";

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
        <h1>LES MEILLEURES RECETTES</h1>
        <div className="flex flex-row items-center justify-center">
          {Object.entries(imagesUrl).map(([key, url], index) => (
            <div className="flex flex-col bg-[#FEE4CC] border rounded-full h-48 w-20 items-center justify-center m-2 " key={index}>
              <div className="h-24 w-24 rounded-full hover:bg-[#FEE4CC] flex items-center justify-center shadow m-2">
                <Image height={24} width={24} className="rounded-full" src={url} alt={`Image of ${key}`} />
              </div>
              <span>{key.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <div>
          <Searchbar />
        </div>
      </div>
      <div className="w-[50%] relative">
        <div className="h-132 w-132 absolute z-[-1] rounded-full bg-[#FEE4CC] flex items-center justify-center shadow m-2" />
        <div className="h-100 w-100 absolute z-[-1] top-[4.5rem] left-[5.5rem] rounded-full bg-[#FA94A8] flex items-center justify-center shadow m-2" />
        <Image alt='image of a meal' height={128} width={256} className='h-128' src='/images/meal.png' />
      </div>
    </div>
  );
}