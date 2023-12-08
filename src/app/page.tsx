"use client"

import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { RecipeLinkType } from '@/components/RecipeLink';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeList } from '@/components/RecipeList';



const eggs: RecipeLinkType[] = [
  {
    name: 'Microwave Egg Custard',
    url: 'https://cooking.nytimes.com/recipes/1022590-microwave-steamed-eggs',
  },
  {
    name: 'Shakshuka',
    url: 'https://cooking.nytimes.com/recipes/1014721-shakshuka-with-feta',
  }
];

const tofu: RecipeLinkType[] = [
  {
    name: 'Mattar Paneer',
    url: 'https://cooking.nytimes.com/recipes/1023017-mattar-paneer-peas-and-paneer-in-spiced-tomato-gravy',
  },
  {
    name: 'Glazed Tofu with Chile and Star Anise',
    url: 'https://cooking.nytimes.com/recipes/1022167-glazed-tofu-with-chile-and-star-anise'
  }
];

const beans: RecipeLinkType[] = [
  {
    name: 'Cheesey Bean Bake',
    url: 'https://cooking.nytimes.com/recipes/1020705-cheesy-spicy-black-bean-bake',
  },
  {
    name: 'Spicy Dahl',
    url: 'https://biancazapatka.com/en/red-lentil-dahl/'
  }
];



export default function Home() {
  const [url, setUrl] = useState<string>();
  const [recipe, setRecipe] = useState();

  const getRecipe = async (url:string) => {
    fetch(`/api/recipe?url=${url}`).then(
      res => res.json()
    ).then(
      data => setRecipe(data.data)
    );
  };

  const handleRecipe = (url: string) => {
    setUrl(url);
    setRecipe(undefined);
    getRecipe(url);
  }

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <header className={styles.card}>
          <h1>Ben&apos;s Recipe Books</h1>
          <p>High-protein recipes for the no-meat athlete</p>
        </header>
        <RecipeList label="Egg" recipeList={eggs} handleLinkClick={handleRecipe} />
        <RecipeList label="Tofu" recipeList={tofu} handleLinkClick={handleRecipe} />
        <RecipeList label="Legumes" recipeList={beans} handleLinkClick={handleRecipe} />

        <div className={styles.recipeContainer}>
          { url ? (recipe ? <RecipeCard recipe={recipe} url={url}/> : <>Loading</>) : undefined }
        </div>
      </div>
    </main>
  )
}
