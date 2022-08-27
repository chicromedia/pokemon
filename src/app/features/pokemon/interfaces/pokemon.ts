export interface IPokemon
{
    id?: number | null;
    name: string;
    image: string;
    attack: number;
    defense: number;
    hp?: number;
    type?: string;
    id_author?: 1;
}
