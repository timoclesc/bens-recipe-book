import { FC } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Recipe, ImageObject } from 'schema-dts';
import styles from './RecipeCard.module.css';
import { RecipeLinkType } from '@/components/RecipeLink';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Servings } from '../Servings';

dayjs.extend(duration);
dayjs.extend(relativeTime);

type Props = {
  recipe: Recipe;
  recipeLink: RecipeLinkType;
}

function getImageSrc(image: string | ImageObject[] | object): string {
  if (typeof image === 'string') {
    return image;
  }

  if (Array.isArray(image) && typeof image[image.length - 1] === 'string') {
    return image[image.length - 1];
  }

  if (Array.isArray(image) && typeof image[image.length - 1] === 'object') {
    return image[image.length - 1].url;
  }

  return '';
}

export const RecipeCard: FC<Props> = ({
  recipe,
  recipeLink
}: Props) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: '100%', maxHeight: '100%', overflow: 'scroll' }}>
      {recipe.image ?
        <CardMedia
          sx={{ aspectRatio: 1.3 }}
          image={getImageSrc(recipe.image)}
          title=""
        />
        : undefined}
      <CardContent sx={{ textAlign: 'left' }}>
        {recipe.publisher && typeof recipe.publisher == 'object' ? <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          From: <a href={recipeLink.url}>{'name' in recipe.publisher ? recipe.publisher.name as string : ''}</a>
        </Typography> : undefined}
        <Typography variant="h4" component="h2">
          {recipe.name as string}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {recipe.recipeCategory as string}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <Servings servings={recipe.recipeYield} />{' | '}{recipe.totalTime ? dayjs.duration(recipe.totalTime as string).humanize() : undefined}
        </Typography>
        <Typography sx={{ mb: 3, fontSize: 14 }}>
          <div dangerouslySetInnerHTML={{ __html: recipe.description as string }}></div>
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Ingredients
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          {
            recipe.recipeIngredient && Array.isArray(recipe.recipeIngredient) ?
              <ul className={styles.list}>
                {recipe.recipeIngredient.map(
                  ingredient => <li key={ingredient}>{ingredient}</li>
                )}
              </ul>
              : undefined
          }
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Steps
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          {
            recipe.recipeInstructions && Array.isArray(recipe.recipeInstructions) ?
              <ul className={styles.list}>
                {recipe.recipeInstructions.map(
                  step => <li key={step.text}>{step.text}</li>
                )}
              </ul>
              : undefined
          }
        </Typography>

        {recipe.nutrition ?
          <>
            <Typography variant="h5" component="h3" gutterBottom>
              Nutrition
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {
                recipe.nutrition ?
                  <>
                    Carbs: {'carbohydrateContent' in recipe.nutrition ? recipe.nutrition?.carbohydrateContent : '?'}<br />
                    Protein: {'proteinContent' in recipe.nutrition ? recipe.nutrition?.proteinContent : '?'}<br />
                    Fat: {'fatContent' in recipe.nutrition ? recipe.nutrition?.fatContent : '?'}
                  </>
                  : undefined
              }
            </Typography>
          </> : undefined}

        {recipeLink.notes ?
          <>
            <Typography variant="h5" component="h3" gutterBottom>
              Tim&apos;s Notes
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {recipeLink.notes.map(note => note)}
            </Typography>
          </> : undefined}
      </CardContent>
    </Card>
  );
}