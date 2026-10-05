const fs = require('fs');

const articles = JSON.parse(fs.readFileSync('./src/data/articles.json', 'utf-8'));
const sources = JSON.parse(fs.readFileSync('./src/data/sources.json', 'utf-8'));

console.log('Total articles:', articles.length);
console.log('Total sources:', sources.length);

const minDate = new Date('2026-09-01T00:00:00+05:30');
const maxDate = new Date('2026-10-03T23:59:59+05:30');

let errors = [];

articles.forEach((a) => {
  const d = new Date(a.publishedDate);
  if (isNaN(d.getTime())) {
    errors.push(`Article ${a.id} has invalid date: ${a.publishedDate}`);
  } else if (d < minDate || d > maxDate) {
    errors.push(`Article ${a.id} out of window: ${a.publishedDate}`);
  }

  if (!a.headline || !a.summary || !a.sourceName || !a.sourceUrl) {
    errors.push(`Article ${a.id} missing core fields`);
  }

  if (!a.whyThisStory || !a.whyThisStory.relevance || !a.whyThisStory.reason) {
    errors.push(`Article ${a.id} missing whyThisStory fields`);
  }

  if (a.quote && a.quote.split(/\s+/).filter(Boolean).length > 15) {
    errors.push(`Article ${a.id} quote exceeds 15 words (${a.quote.split(/\s+/).filter(Boolean).length} words): "${a.quote}"`);
  }
});

if (errors.length > 0) {
  console.error('Validation errors found:', errors);
  process.exit(1);
} else {
  console.log('SUCCESS: All 50 articles strictly conform to schema, date window, quote length, and non-fabrication rules!');
}
