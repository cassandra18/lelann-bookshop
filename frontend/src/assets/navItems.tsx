interface SubNavItem {
    name: string;
    link: string;
}

interface NavItem {
    name: string;
    link: string;
    subLinks?: SubNavItem[];
}

export const NavItems: NavItem[] = [
    {
        name: "Educational Books",
        link: "/educational-books",
        subLinks: [
            { name: "Pre-Primary & ECDE", link: "/pre-primary" },
            { name: "Competency Based Curriculum", link: "/cbc" },
            { name: "International Curriculum", link: "/international" },
            { name: "Primary School", link: "/primary" },
            { name: "Secondary School", link: "/secondary" },
            { name: "Tertiary & University", link: "/tertiary" },
            { name: "Reference", link: "/reference" },
        ],
    },
    {
        name: "Other Books",
        link: "/other-books",
        subLinks: [
            { name: "Children's Books", link: "/children" },
            { name: "Teen & Young Adult", link: "/teen" },
            { name: "Motivational & Self-help", link: "/motivational" },
            { name: "Biographies", link: "/biographies" },
            { name: "African Literature", link: "/african" },
            { name: "Romance", link: "/romance" },
            { name: "Fiction", link: "/fiction" },
            { name: "Non-Fiction", link: "/non-fiction" },
            { name: "Comics & Graphic Novels", link: "/comics" },
            { name: "Science Fiction & Fantasy", link: "/science-fiction" },
            { name: "Mystery & Thriller", link: "/mystery" },
            { name: "Horror", link: "/horror" },
            { name: "Poetry", link: "/poetry" },
            { name: "Drama", link: "/drama" },
            { name: "History", link: "/history" },
            { name: "Politics & Political Leaders", link: "/politics" },
            { name: "Business", link: "/business" },
            { name: "Economics", link: "/economics" },
            { name: "Law", link: "/law" },
            { name: "Philosophy", link: "/philosophy" },
            { name: "Psychology", link: "/psychology" },
            { name: "Sociology", link: "/sociology" },
            { name: "Anthropology", link: "/anthropology" },
            { name: "Health & Fitness", link: "/health" },
            { name: "Family & Relationships", link: "/family" },
            { name: "Crafts & Hobbies", link: "/crafts" },
            { name: "Home & Garden", link: "/home" },
            { name: "Travel", link: "/travel" },
            { name: "Sports", link: "/sports" },
            { name: "Science", link: "/science" },
            { name: "Nature", link: "/nature" },
            { name: "Technology", link: "/technology" },
            { name: "Engineering", link: "/engineering" },
            { name: "Mathematics", link: "/mathematics" },
            { name: "Art", link: "/art" },
            { name: "Music", link: "/music" },
            { name: "Film", link: "/film" },
            { name: "Dance", link: "/dance" },
            { name: "Photography", link: "/photography" },
            { name: "Architecture", link: "/architecture" },
            { name: "Design", link: "/design" },
            { name: "Fashion", link: "/fashion" },
            { name: "Beauty", link: "/beauty" },
            { name: "Medicine", link: "/medicine" },
            { name: "Nursing", link: "/nursing" },
            { name: "Dentistry", link: "/dentistry" },
            { name: "Pharmacy", link: "/pharmacy" },
            { name: "Veterinary", link: "/veterinary" },
            { name: "Agriculture", link: "/agriculture" },
            { name: "Food & Nutrition", link: "/food" },
            { name: "Environment", link: "/environment" },
            { name: "Geography", link: "/geography" },
            { name: "Urban Planning", link: "/urban" },
            { name: "Language", link: "/language" },
            { name: "Literature", link: "/literature" },
            { name: "Religion", link: "/religion" },
            { name: "Cookbooks", link: "/cookbooks" },
            { name: "Diaries & Journals", link: "/diaries" },
            { name: "Others", link: "/others" },
        ],
    },
    {
        name: "Stationary",
        link: "/stationary",
        subLinks: [
            { name: "Office Stationary", link: "/office" },
            { name: "School Stationary", link: "/school" },
            { name: "Desk Accessories", link: "/desk" },
            { name: "Exercise Books", link: "/exercise" },
            { name: "Files & Binders", link: "/files" },
            { name: "Markers & Highlighters", link: "/markers" },
            { name: "Bundled stationaries", link: "/bundled" },
            { name: "Notebooks & Diaries", link: "/notebooks" },
            { name: "Pens, Pencils & Pouches", link: "/pens" },
            { name: "Accounting Books", link: "/accounting" },
            { name: "Library Items", link: "/library" },
            { name: "Technical Items", link: "/technical" },
            { name: "Writing Pads", link: "/writing" },
            { name: "Cards, Envelopes & Gifts", link: "/cards" },
            { name: "Others", link: "/others" },
        ]
    },
    {
        name: "Elecronics",
        link: "/electronics",
        subLinks: [
            { name: "Calcuators", link: "/calculators" },
        ]
    },
    {
        name: "Art Supplies",
        link: "/art-supplies",
        subLinks: [
            { name: "Paint Mediums", link: "/paints" },
            { name: "Brushes", link: "/brushes" },
            { name: "Canvases", link: "/canvases" },
            { name: "Drawing books", link: "/drawing" },
            { name: "Sketch pads", link: "/sketch" },
            { name: "Modelling clay", link: "/modelling" },
            { name: "Pencils & Erasers", link: "/pencils" },
            { name: "Pens, Markers & Inks", link: "/pens" },
            { name: "Pastel, Charcoal & Crayons", link: "/pastel" },
            { name: "Craft Supplies", link: "/craft" },
            { name: "Adhesives & Cutting Tools", link: "/adhesives" },
            { name: "Children's colouring bookss", link: "/children" },
            { name: "Adult colouring books", link: "/adult" },
            { name: "Others", link: "/others" },
        ]
    },
    {
        name: "Toys & Games",
        link: "/toys-games",
        subLinks: [
            { name: "Educational Toys", link: "/educational" },
            { name: "Puzzles", link: "/puzzles" },
            { name: "Board Games", link: "/board" },
            { name: "Outdoor Toys", link: "/outdoor" },
            { name: "Dolls & Accessories", link: "/dolls" },
            { name: "Action Figures", link: "/action" },
            { name: "Building Toys", link: "/building" },
            { name: "Cars, Trains & Planes", link: "/cars" },
            { name: "Dress-up & Pretend Play", link: "/dress-up" },
            { name: "Musical Instruments", link: "/musical" },
            { name: "Others", link: "/others" },
        ]
    },
    {
        name: "On Sale",
        link: "/on-sale"
    },
    {
        name: "BookList",
        link: "/booklist"
    },
    {
        name: "About Us",
        link: "/about-us"
    },
    {
        name: "Contact Us",
        link: "/contact-us"
    },
];