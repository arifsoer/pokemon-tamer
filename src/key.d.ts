interface PokemonInterface {
  name: string;
  url: string;
  id: string;
  sprites: SpriteInterface;
}

interface SpriteInterface {
  other: OtherInterface
}

interface OtherInterface {
  [index: string]: any
}

interface TypeInterface {
  id: number;
  name: string;
}