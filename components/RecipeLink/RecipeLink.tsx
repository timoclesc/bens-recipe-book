import { FC, HTMLProps } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowForward from '@mui/icons-material/ArrowForward';

export type RecipeLinkType = {
    name: string;
    url: string;
    notes?: string[]
}

type Props = HTMLProps<HTMLButtonElement> & {
    label: string;
}

export const RecipeLink: FC<Props> = ({
    label,
    onClick,
}: Props) => {
    return (
        <ListItemButton component="button" onClick={onClick} sx={{ gap: '0.5rem' }}>
            <ListItemText primary={label} />
            <ArrowForward />
        </ListItemButton>
    )
}