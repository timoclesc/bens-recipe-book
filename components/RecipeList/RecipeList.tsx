import {FC} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RecipeLink, RecipeLinkType } from '@/components/RecipeLink';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type Props = {
  label: string;
  recipeList: RecipeLinkType[];
  handleLinkClick: (url: string) => void;
}

export const RecipeList:FC<Props> = ({
  label,
  recipeList,
  handleLinkClick,
}:Props) => {
  return (
    <Card sx={{ }}>
      <CardContent>
        <Typography variant="h4" component="h2">
          { label }
        </Typography>
        <List>
        { recipeList.map(
          ({name, url}) => (
            <ListItem key={url} disablePadding>
              <RecipeLink label={name} onClick={() => handleLinkClick(url)} />
            </ListItem>)
          )
        }
        
        </List>
      </CardContent>
    </Card>
  );
}