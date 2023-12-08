import {FC} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Recipe } from 'schema-dts';
import styles from './RecipeCard.module.css';

import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

type Props = {
  recipe: Recipe;
  url: string;
}

export const RecipeCard:FC<Props> = ({
    recipe,
    url
}:Props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      { recipe.image ? 
      <CardMedia
        sx={{ aspectRatio: 1.3 }}
        image={recipe.image[recipe.image.length - 1]}
        title=""
      />
        : undefined }
      <CardContent sx={{textAlign: 'left'}}>
        {recipe.publisher ? <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          From: <a href={url}>{ recipe.publisher.name}</a>
        </Typography> : undefined }
        <Typography variant="h4" component="h2">
          { recipe.name }
        </Typography>
        <Typography  sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { recipe.recipeCategory }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { recipe.recipeYield}{' | '}{ recipe.totalTime ? dayjs.duration(recipe.totalTime).humanize() : undefined }
        </Typography>
        <Typography sx={{ fontSize: 14 }} sx={{ mb: 3 }}>
          <div dangerouslySetInnerHTML={{__html: recipe.description}}></div>
          </Typography>

          <Typography variant="h5" component="h3" gutterBottom>
            Ingredients
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {
              recipe.recipeIngredient ? 
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
              recipe.recipeInstructions ? 
              <ul className={styles.list}>
                {recipe.recipeInstructions.map(
                  step => <li key={step.text}>{step.text}</li>
              )}
              </ul>
                : undefined 
            }
          </Typography>

          <Typography variant="h5" component="h3" gutterBottom>
            Nutrition
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {
              recipe.nutrition ? 
              <>
                Carbs: {recipe.nutrition?.carbohydrateContent}<br />
                Protein: {recipe.nutrition?.proteinContent}<br />
                Fat: {recipe.nutrition?.fatContent}
              </>
                : undefined 
            }
          </Typography>
      </CardContent>
    </Card>
  );
}