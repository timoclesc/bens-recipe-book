"use client"

import styles from './page.module.css'
import { useState } from 'react';
import { RecipeLinkType } from '@/components/RecipeLink';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeList } from '@/components/RecipeList';
import { AppModal } from '@/components/AppModal/AppModal';
import { Loader } from '@/components/Loader';


const eggs: RecipeLinkType[] = [
  {
    name: 'Microwave Egg Custard',
    url: 'https://cooking.nytimes.com/recipes/1022590-microwave-steamed-eggs',
  },
  {
    name: 'Shakshuka',
    url: 'https://cooking.nytimes.com/recipes/1014721-shakshuka-with-feta',
  },
  {
    name: 'Egg Curry',
    url: 'https://cooking.nytimes.com/recipes/1020912-egg-curry'
  },
  {
    name: 'Plantains with Jammy Eggs',
    url: 'https://cooking.nytimes.com/recipes/1022450-plantains-with-jammy-tomatoes-and-eggs'
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
  },
  {
    name: 'BBQ Tofu',
    url: 'https://cooking.nytimes.com/recipes/1021720-folamis-bbq-tofu'
  },
  {
    name: 'Paneer Chilli Dry',
    url: 'https://cooking.nytimes.com/recipes/1024371-paneer-chile-dry'
  },
  {
    name: 'Cumin Tofu Stir-fry',
    url: 'https://cooking.nytimes.com/recipes/1022438-cumin-tofu-stir-fry'
  }
];

const legumes: RecipeLinkType[] = [
  {
    name: 'Cheesey Bean Bake',
    url: 'https://cooking.nytimes.com/recipes/1020705-cheesy-spicy-black-bean-bake',
  },
  {
    name: 'Spicy Dahl',
    url: 'https://biancazapatka.com/en/red-lentil-dahl/'
  },
  {
    name: 'Vegan Chili',
    url: 'https://cooking.nytimes.com/recipes/1020866-vegan-chili'
  },
  {
    name: 'Red Lentil Pancake',
    url: 'https://www.lazycatkitchen.com/red-lentil-pancakes/'
  }
];

const misc: RecipeLinkType[] = [
  {
    name: 'Seitan Piccata',
    url: 'https://www.delish.com/cooking/recipe-ideas/a35569963/vegan-piccata-recipe/',
  },
  {
    name: 'Chia Smoothie',
    url: 'https://www.acouplecooks.com/chia-seed-smoothie/'
  },
  {
    name: 'High protein bread',
    url: 'https://holycowvegan.net/high-protein-whole-wheat-sandwich-bread/'
  },
  {
    name: 'Pumfu (Pepita Tofu)',
    url: 'https://www.marystestkitchen.com/pumpkin-seed-tofu/',
    notes: [
      '35g of protein per serving (recipe makes 4 servings)'
    ]
  }
];



export default function Home() {
  const [recipeLink, setRecipeLink] = useState<RecipeLinkType>();
  const [recipe, setRecipe] = useState();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClose = () => {
    setModalOpen(false);
    setRecipeLink(undefined);
    setRecipe(undefined);
  };

  const getRecipe = async (url: string) => {
    fetch(`/api/recipe?url=${url}`).then(
      res => res.json()
    ).then(
      data => setRecipe(data.data)
    );
  };

  const handleRecipe = (recipeLink: RecipeLinkType) => {
    setRecipeLink(recipeLink);
    setRecipe(undefined);
    getRecipe(recipeLink.url);
    setModalOpen(true);
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
        <RecipeList label="Legumes" recipeList={legumes} handleLinkClick={handleRecipe} />
        <RecipeList label="Misc" recipeList={misc} handleLinkClick={handleRecipe} />

        <AppModal isOpen={modalOpen} handleClose={handleClose}>
          {(recipe && recipeLink) ? <RecipeCard recipe={recipe} recipeLink={recipeLink} /> : <Loader />}
        </AppModal>
      </div>
    </main >
  )
}
