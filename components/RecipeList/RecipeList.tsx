import { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { RecipeLink, RecipeLinkType } from '@/components/RecipeLink';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type Props = {
  label: string;
  recipeList: RecipeLinkType[];
  handleLinkClick: (recipeLink: RecipeLinkType) => void;
}

export const RecipeList: FC<Props> = ({
  label,
  recipeList,
  handleLinkClick,
}: Props) => {
  return (
    <Card sx={{}}>
      <CardContent>
        <Typography variant="h4" component="h2">
          {label}
        </Typography>
        <List>
          {recipeList.map(
            (recipeLink) => (
              <ListItem key={recipeLink.url} disablePadding>
                <RecipeLink label={recipeLink.name} onClick={() => handleLinkClick(recipeLink)} />
              </ListItem>)
          )
          }

        </List>
      </CardContent>
    </Card>
  );
}