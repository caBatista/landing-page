import type { ImageAsset, Localized } from "./types";

export type ProjectLink = {
  kind: "live" | "repo" | "backend" | "frontend";
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  context: Localized;
  year: string;
  summary: Localized;
  features: Localized<string[]>;
  stack: string[];
  links: ProjectLink[];
  /** `base` shows by default, `hover` swaps in on hover/focus. */
  image: { base: ImageAsset; hover: ImageAsset; frame: "browser" | "phone" };
};

/** Shown in this order. */
export const projects: Project[] = [
  {
    slug: "home-sweet-home",
    name: "Home Sweet Home",
    context: {
      en: "Personal project · Solo, full stack",
      pt: "Projeto pessoal · Solo, full stack",
    },
    year: "TODO: year",
    summary: {
      en: "A digital housewarming gift registry and marketplace. Friends and family buy selected household items or make monetary donations to help furnish a new home.",
      pt: "Uma lista de presentes de casa nova digital, com loja integrada. Amigos e família compram itens selecionados para a casa ou fazem doações em dinheiro para ajudar a mobiliar o novo lar.",
    },
    features: {
      en: [
        "Product listing homepage with real-time stock availability",
        "Category filters in the header",
        "Secure checkout via the MercadoPago API for both product sales and donations",
        "Shopping cart: add, change quantity, remove",
        "Stock decremented only after MercadoPago webhooks confirm the payment",
        "Light/dark theme toggle",
      ],
      pt: [
        "Página inicial com listagem de produtos e estoque em tempo real",
        "Filtros por categoria no cabeçalho",
        "Checkout seguro via API do MercadoPago, tanto para compras quanto para doações",
        "Carrinho de compras: adicionar, alterar quantidade, remover",
        "Estoque decrementado só depois que os webhooks do MercadoPago confirmam o pagamento",
        "Alternância entre tema claro e escuro",
      ],
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Next.js API routes",
      "Prisma",
      "PostgreSQL",
      "MercadoPago API",
      "Git",
      "Vercel",
    ],
    links: [
      { kind: "live", href: "https://www.projetocasanova.com" },
      { kind: "repo", href: "https://github.com/caBatista/home-sweet-home" },
    ],
    image: {
      frame: "browser",
      // TODO: screenshot — product grid, light theme (base) and dark theme (hover).
      base: {
        src: "/images/projects/home-sweet-home.jpg",
        width: 1600,
        height: 1000,
        alt: {
          en: "Home Sweet Home product grid in the light theme",
          pt: "Grade de produtos do Home Sweet Home no tema claro",
        },
      },
      hover: {
        src: "/images/projects/home-sweet-home-dark.jpg",
        width: 1600,
        height: 1000,
        alt: {
          en: "Home Sweet Home product grid in the dark theme",
          pt: "Grade de produtos do Home Sweet Home no tema escuro",
        },
      },
    },
  },
  {
    slug: "fluimap",
    name: "FluiMap",
    context: { en: "AGES · PUCRS", pt: "AGES · PUCRS" },
    year: "TODO: year",
    summary: {
      en: "A web app for managers to assess team dynamics and engagement through structured surveys: creation, login-free email distribution and analysis powered by an R statistical model API.",
      pt: "Uma aplicação web para gestores avaliarem a dinâmica e o engajamento de times com questionários estruturados: criação, envio por email sem login e análise com uma API de modelo estatístico em R.",
    },
    features: {
      en: [
        "Manager authentication (Clerk) and team management, with individual and CSV bulk add",
        "Survey administration: launch, deadlines, real-time response monitoring and reporting",
        "Email distribution (Resend, React Email) with unique no-auth links per team member",
        "Data pipeline integrating an R model API for metrics and visualizations",
        "Interactive results dashboard with team network graphs and engagement metrics (contributed)",
        "Teams, Respondees and Surveys APIs validated with Zod",
      ],
      pt: [
        "Autenticação de gestores (Clerk) e gestão de times, com cadastro individual e em lote via CSV",
        "Administração de questionários: lançamento, prazos, acompanhamento de respostas em tempo real e relatórios",
        "Envio por email (Resend, React Email) com links únicos, sem login, para cada membro do time",
        "Pipeline de dados integrado a uma API de modelo em R para métricas e visualizações",
        "Dashboard interativo de resultados com grafos de rede do time e métricas de engajamento (contribuição)",
        "APIs de Times, Respondentes e Questionários validadas com Zod",
      ],
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "shadcn/ui",
      "Tailwind CSS",
      "Radix UI",
      "React Hook Form",
      "Zod",
      "TanStack Query",
      "Next.js API routes",
      "MongoDB",
      "Mongoose",
      "Clerk",
      "Resend",
      "R Model API",
      "Docker",
      "ESLint",
      "Prettier",
    ],
    links: [{ kind: "repo", href: "https://tools.ages.pucrs.br/fluimap/core.git" }],
    image: {
      frame: "browser",
      // TODO: screenshot — dark dashboard with the team network graph.
      base: {
        src: "/images/projects/fluimap.jpg",
        width: 1600,
        height: 1000,
        alt: {
          en: "FluiMap results dashboard with the team network graph",
          pt: "Dashboard de resultados do FluiMap com o grafo de rede do time",
        },
      },
      hover: {
        src: "/images/projects/fluimap-alt.jpg",
        width: 1600,
        height: 1000,
        alt: {
          en: "FluiMap engagement metrics view",
          pt: "Visão de métricas de engajamento do FluiMap",
        },
      },
    },
  },
  {
    slug: "ezenplo",
    name: "eZenplo Dashboard",
    context: { en: "AGES · PUCRS · Key contributor", pt: "AGES · PUCRS · Contribuidor principal" },
    year: "TODO: year",
    summary: {
      en: "A corporate well-being platform dashboard with data visualization, employee and manager management and CSV processing, built to improve data analysis and operational efficiency.",
      pt: "Dashboard de uma plataforma de bem-estar corporativo, com visualização de dados, gestão de colaboradores e gestores e processamento de CSV, feito para melhorar a análise de dados e a eficiência operacional.",
    },
    features: {
      en: [
        "Secure authentication with role-based access control",
        "Interactive dashboard with charts",
        "Employee and manager management through table views",
        "CSV upload and download",
        "Dynamic data filtering",
        "RESTful API with FastAPI",
        "Docker and Docker Compose for consistent development and deploys",
      ],
      pt: [
        "Autenticação segura com controle de acesso por papéis",
        "Dashboard interativo com gráficos",
        "Gestão de colaboradores e gestores em tabelas",
        "Upload e download de CSV",
        "Filtros dinâmicos de dados",
        "API RESTful com FastAPI",
        "Docker e Docker Compose para desenvolvimento e deploy consistentes",
      ],
    },
    stack: [
      "Python",
      "FastAPI",
      "Pydantic",
      "MySQL",
      "TypeScript",
      "React",
      "Vite",
      "Material UI",
      "Chart.js",
      "Axios",
      "Docker",
      "Docker Compose",
      "Git",
      "ESLint",
      "Prettier",
      "Jest",
      "Pytest",
    ],
    links: [
      { kind: "backend", href: "https://tools.ages.pucrs.br/dashboard-ezenplo/backend.git" },
      { kind: "frontend", href: "https://tools.ages.pucrs.br/dashboard-ezenplo/frontend.git" },
    ],
    image: {
      frame: "browser",
      // TODO: screenshot — dimensions filter + stacked bar chart with green/yellow/red bands.
      base: {
        src: "/images/projects/ezenplo.jpg",
        width: 1600,
        height: 1000,
        alt: {
          en: "eZenplo dashboard with a stacked bar chart per well-being dimension",
          pt: "Dashboard do eZenplo com gráfico de barras empilhadas por dimensão de bem-estar",
        },
      },
      hover: {
        src: "/images/projects/ezenplo-alt.jpg",
        width: 1600,
        height: 1000,
        alt: {
          en: "eZenplo employee management table",
          pt: "Tabela de gestão de colaboradores do eZenplo",
        },
      },
    },
  },
  {
    slug: "turismo-rural",
    name: "Turismo Rural",
    context: {
      en: "AGES · PUCRS · São Francisco de Paula",
      pt: "AGES · PUCRS · São Francisco de Paula",
    },
    year: "TODO: year",
    summary: {
      en: "A full-stack platform to boost local tourism, connecting visitors with experiences, routes and businesses. I built both the Flutter mobile app and the Java Spring Boot backend.",
      pt: "Uma plataforma full stack para impulsionar o turismo local, conectando visitantes a experiências, roteiros e negócios. Construí tanto o app mobile em Flutter quanto o backend em Java Spring Boot.",
    },
    features: {
      en: [
        "Categorized experience discovery: events, attractions, dining, lodging",
        "Touristic route exploration with map integration",
        "User authentication and profile management",
        "Multi-step business registration with AWS S3 image uploads",
        "Flutter frontend with BLoC for state management",
        "REST APIs powering every feature",
      ],
      pt: [
        "Descoberta de experiências por categoria: eventos, atrações, gastronomia, hospedagem",
        "Exploração de roteiros turísticos com mapa integrado",
        "Autenticação de usuários e gestão de perfil",
        "Cadastro de negócios em etapas, com upload de imagens no AWS S3",
        "Frontend em Flutter com BLoC para gerenciamento de estado",
        "APIs REST por trás de cada funcionalidade",
      ],
    },
    stack: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Flutter",
      "Dart",
      "BLoC",
      "AWS S3",
      "Docker",
      "Nginx",
      "Git",
      "GitLab CI/CD",
    ],
    links: [
      {
        kind: "backend",
        href: "https://tools.ages.pucrs.br/o-turismo-rural-em-s-o-francisco-de-paula/turismo-rural-backend.git",
      },
      {
        kind: "frontend",
        href: "https://tools.ages.pucrs.br/o-turismo-rural-em-s-o-francisco-de-paula/turismo-rural-frontend",
      },
    ],
    image: {
      frame: "phone",
      // TODO: screenshot — mobile home screen with the events carousel (portrait, ~9:19.5).
      base: {
        src: "/images/projects/turismo-rural.jpg",
        width: 900,
        height: 1950,
        alt: {
          en: "Turismo Rural app home screen with the events carousel",
          pt: "Tela inicial do app Turismo Rural com o carrossel de eventos",
        },
      },
      hover: {
        src: "/images/projects/turismo-rural-alt.jpg",
        width: 900,
        height: 1950,
        alt: {
          en: "Turismo Rural route map screen",
          pt: "Tela de mapa de roteiros do Turismo Rural",
        },
      },
    },
  },
];
