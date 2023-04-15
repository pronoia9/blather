const tagsData = [
  { url: 'https://twitter.com/hashtag/COVID19?src=hashtag_click', tag: 'COVID19' },
  { url: 'https://twitter.com/hashtag/BlackLivesMatter?src=hashtag_click', tag: 'BlackLivesMatter' },
  { url: 'https://twitter.com/hashtag/StayHome?src=hashtag_click', tag: 'StayHome' },
  { url: 'https://twitter.com/hashtag/DonaldTrump?src=hashtag_click', tag: 'DonaldTrump' },
  { url: 'https://twitter.com/hashtag/CoronavirusOutbreak?src=hashtag_click', tag: 'CoronavirusOutbreak' },
];

const linksData = [
  'https://www.codecademy.com/learn/learn-programming',
  'Learn Programming | Codecademy',
  'https://www.freecodecamp.org/',
  'Free Code Camp | Learn to Code and Help Nonprofits',
  'https://www.khanacademy.org/computing/computer-programming',
  'Computer programming | Khan Academy',
  'https://www.udacity.com/courses/all?topic=programming-and-software-development',
  'Programming & Software Development Courses | Udacity',
  'https://www.edx.org/learn/programming',
  'Programming & Software Development Courses | edX',
  'https://developer.mozilla.org/en-US/docs/Learn',
  'Learn web development | MDN',
  'https://www.pluralsight.com/browse/software-development?gclid=Cj0KCQiA_fvsBRDVARIsAJ8yKU9qhFzm_vYGnVdTKLhfEuPXlUjyHsxrpMqbztRZB9eVFmQGvw8YJpcaAvTVEALw_wcB&amp;utm_source=google&amp;utm_medium=cpc&amp;utm_campaign=Brand_Core&amp;utm_term=pluralsight%20software%20development&amp;utm_content=Software%20Development&amp;gclsrc=aw.ds&amp;dclid=COqIo7LW3tUCFQMk7QodSr8H6A#skills=Software%20Development',
  'Software Development Training Courses - Pluralsight',
];

const poemData = [
  `The black cat sat
In the fat man’s hat;
“Oh, dear!” the fat man said.
“May the great gray bat
Catch the bad black cat
Who has left me no hat
For my head!`,
  `A large red cow
Tried to make a bow,
But did not know how,
They say.
For her legs got mixed,
And her horns got fixed,
And her tail would get
In her way.`,
  `A sad, thin ape
Bought some wide white tape
To trim a new cape
For his niece;
But a bold buff calf,
With a loud, rude laugh,
Bit off one whole half
For his geese.`,
][Math.floor(Math.random() * 3)];

export { tagsData, linksData, poemData };
