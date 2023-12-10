import { FC } from 'react';
import { Recipe } from 'schema-dts';

type Props = {
    servings: Recipe["recipeYield"] ;
}

const Servings:FC<Props> = ({servings}) => {
    const serving = Array.isArray(servings) ? servings[servings.length - 1 ] : servings;
    return <span>{serving}</span>;
}

export { Servings }