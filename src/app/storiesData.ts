export interface Story {
    title: string;
    url: string;
    author: string;
    num_comments: number;
    points: number;
    objectID: number;
}

export const stories: Story[] = [
    {
        title: 'JavaScript: The Good Parts',
        url: 'https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742',
        author: 'Douglas Crockford',
        num_comments: 42,
        points: 98,
        objectID: 1,
    },
    {
        title: 'React Hooks Explained',
        url: 'https://reactjs.org/docs/hooks-intro.html',
        author: 'React Team',
        num_comments: 35,
        points: 87,
        objectID: 2,
    },
    {
        title: 'TypeScript Deep Dive',
        url: 'https://basarat.gitbook.io/typescript/',
        author: 'Basarat Ali Syed',
        num_comments: 28,
        points: 76,
        objectID: 3,
    },
    {
        title: 'The Node.js Beginner Guide',
        url: 'https://nodejs.org/en/docs/guides/',
        author: 'Node.js Foundation',
        num_comments: 19,
        points: 65,
        objectID: 4,
    },
    {
        title: 'CSS Tricks for Modern Web',
        url: 'https://css-tricks.com/',
        author: 'Chris Coyier',
        num_comments: 31,
        points: 72,
        objectID: 5,
    },
    {
        title: 'Python for Data Science',
        url: 'https://www.python.org/about/gettingstarted/',
        author: 'Python Software Foundation',
        num_comments: 24,
        points: 68,
        objectID: 6,
    },
    {
        title: 'The Art of Computer Programming',
        url: 'https://www-cs-faculty.stanford.edu/~knuth/taocp.html',
        author: 'Donald Knuth',
        num_comments: 56,
        points: 105,
        objectID: 7,
    },
    {
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
        author: 'Robert C. Martin',
        num_comments: 47,
        points: 92,
        objectID: 8,
    },
    {
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        url: 'https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        num_comments: 39,
        points: 88,
        objectID: 9,
    },
    {
        title: 'The Pragmatic Programmer',
        url: 'https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052',
        author: 'Andrew Hunt, David Thomas',
        num_comments: 52,
        points: 97,
        objectID: 10,
    }
];