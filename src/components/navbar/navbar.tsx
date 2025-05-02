import Link from 'next/link';

export const Navbar = () => {
    return(
        <div className="w-full flex flex-row justify-between items-center p-4">
            <Link href="/planner">Mes recettes</Link>
            <Link href="/recipes">Explorer des recettes</Link>
            <Link href="/my-cart">Mon panier</Link>
        </div>
    );
};