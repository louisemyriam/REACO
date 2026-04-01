export type AppBook = {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
    progress?: number;
    isPurchased?: boolean;
    isInWishlist?: boolean;
    similarBooks?: string[];
  };
  
  export const BOOKS_BY_ID: Record<string, AppBook> = {
    '3': {
      id: '3',
      title: 'Raison et sentiments',
      coverUrl:
        'https://media.groupe.gallimard.fr/couvHD/J05298.jpg',
      description:
        "Une romance classique pleine d’esprit sur les apparences, les jugements hâtifs et l’évolution des sentiments. Elizabeth Bennet et Mr. Darcy apprennent à dépasser leurs préjugés dans un récit élégant, vif et intemporel.",
      isPurchased: false,
      isInWishlist: false,
      similarBooks: ['2', 'w4', 'w3'],
    },
  
    '4': {
      id: '4',
      title: 'Frankenstein',
      coverUrl:
        'https://m.media-amazon.com/images/I/81D0ziLvzwL._AC_UF1000,1000_QL80_.jpg',
      description:
        "Un grand classique gothique où science, solitude et responsabilité se rencontrent. À travers la création d’un être vivant, Mary Shelley explore la peur, l’abandon et les limites de l’ambition humaine.",
      isPurchased: false,
      isInWishlist: true,
      similarBooks: ['d1', 'w1', 'w4'],
    },
  
    '1': {
      id: '1',
      title: 'Roméo et Juliette',
      coverUrl:
        'https://images.epagine.fr/094/9782264081094_1_75.jpg',
      description:
        "L’histoire tragique de deux amants issus de familles ennemies, dont l’amour impossible est devenu l’un des plus grands classiques de la littérature.",
      progress: 23,
      isPurchased: true,
      similarBooks: ['1', 'w4', 'w3'],
    },
  
    '2': {
      id: '2',
      title: 'Dracula',
      coverUrl:
        'https://products-images.di-static.com/image/bram-stoker-dracula/9781435129733-475x500-1.jpg',
      description:
        "Un roman gothique emblématique où mystère, tension et horreur se mêlent autour de l’inquiétant comte Dracula.",
      progress: 61,
      isPurchased: true,
      similarBooks: ['2', 'd1', 'w1'],
    },
  
    w1: {
      id: 'w1',
      title: 'Les Misérables',
      coverUrl:
        'https://m.media-amazon.com/images/I/71lxLN4vorL.jpg',
      description:
        "Une fresque monumentale sur la misère, la justice, la rédemption et la condition humaine dans la France du XIXe siècle.",
      isPurchased: false,
    },
  
    w3: {
      id: 'w3',
      title: 'Little Women',
      coverUrl:
        'https://fr.shopping.rakuten.com/photo/little-women-louisa-may-alcott-1034341377_ML.jpg',
      description:
        "Le récit tendre et marquant de quatre sœurs qui grandissent, rêvent et apprennent à trouver leur place dans le monde.",
      isPurchased: false,
    },
  
    w4: {
      id: 'w4',
      title: 'Jane Eyre',
      coverUrl:
        'https://images.epagine.fr/799/9782073061799_1_75.jpg',
      description:
        "Le parcours intense d’une jeune femme indépendante, entre épreuves, secrets et quête de dignité.",
      isPurchased: false,
    },
  
    d1: {
      id: 'd1',
      title: '1984',
      coverUrl:
        'https://cdn1.booknode.com/book_cover/72/1984-72084-264-432.webp',
      description:
        "Une dystopie majeure sur la surveillance, le pouvoir et la liberté individuelle.",
      isPurchased: false,
    },
  };