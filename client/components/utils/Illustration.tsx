import Main from '../../assets/images/categories/recipes/main.svg';
import Dessert from '../../assets/images/categories/recipes/dessert.svg';
import Entree from '../../assets/images/categories/recipes/entree.svg';
import Other from '../../assets/images/categories/recipes/other.svg';

import Vegetable from '../../assets/images/categories/ingredients/vegetable.svg';
import Cereal from '../../assets/images/categories/ingredients/cereal.svg';
import Fish from '../../assets/images/categories/ingredients/fish.svg';
import Fruit from '../../assets/images/categories/ingredients/fruit.svg';
import Meat from '../../assets/images/categories/ingredients/meat.svg';
import MilkProduct from '../../assets/images/categories/ingredients/milkProduct.svg';
import SweetProduct from '../../assets/images/categories/ingredients/sweetProduct.svg';
import OtherIngredient from '../../assets/images/categories/ingredients/other.svg';

// Retourne l'illustration correspondant à la catégorie de la recette
export const IllustrationRecipe = (category  : string | undefined)  => {
    switch (category) {
        case "entree":
            return <Entree style={{borderRadius: 10}} width={100} height={100} />
            break;
        case "main":
            return <Main style={{borderRadius: 10}} width={100} height={100} />
            break;
        case "dessert":
            return <Dessert style={{borderRadius: 10}} width={100} height={100} />
            break;
        default:
            return <Other style={{borderRadius: 10}} width={100} height={100} />
            break;
    }
}


// Retourne l'illustration correspondant à la catégorie de l'ingrédient
export const Illustration = (category  : string | undefined, width : number,height : number)  => {
    switch (category) {
        case "vegetable":
            return <Vegetable style={{borderRadius: 10}} width={width} height={height} />
            break;
        case "fruit":
            return <Fruit style={{borderRadius: 10}} width={width} height={height} />
            break;
        case "fish":
            return <Fish style={{borderRadius: 10}} width={width} height={height} />
            break;
        case "meat":
            return <Meat style={{borderRadius: 10}} width={width} height={height} />
            break;
        case "cereal":
            return <Cereal style={{borderRadius: 10}} width={width} height={height} />
            break;
        case "milkProduct":
            return <MilkProduct style={{borderRadius: 10}} width={width} height={height} />
            break;
        case "sweetProduct":
            return <SweetProduct style={{borderRadius: 10}} width={width} height={height} />
            break;
        default:
            return <OtherIngredient style={{borderRadius: 10}} width={width} height={height} />
            break;
    }
}