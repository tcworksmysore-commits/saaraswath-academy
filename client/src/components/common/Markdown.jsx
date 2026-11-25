import React from 'react';
import { Link } from 'react-router-dom';

// Tiny Markdown renderer for articles: ## / ### headings, - lists, paragraphs, **bold**, [text](url).
const inline = (text, key = 0) => {
  const out = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0, m, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${key}-${i++}`}>{inline(m[1], `${key}b${i}`)}</strong>);
    else if (m[3].startsWith('/')) out.push(<Link key={`${key}-${i++}`} to={m[3]}>{m[2]}</Link>);
    else out.push(<a key={`${key}-${i++}`} href={m[3]} target="_blank" rel="noopener noreferrer">{m[2]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
};

export const Markdown = ({ text }) => {
  const blocks = text.trim().split(/\n\s*\n/);
  return blocks.map((b, i) => {
    const lines = b.trim().split('\n');
    if (b.startsWith('### ')) return <h3 key={i}>{inline(b.slice(4), i)}</h3>;
    if (b.startsWith('## ')) return <h2 key={i}>{inline(b.slice(3), i)}</h2>;
    if (lines.every(l => l.trim().startsWith('- '))) {
      return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.trim().slice(2), `${i}-${j}`)}</li>)}</ul>;
    }
    return <p key={i}>{inline(lines.join(' '), i)}</p>;
  });
};

export default Markdown;
