import { Fragment, type ReactNode } from 'react';
import type { Block, RichText } from '@/content/notion';
import styles from './journal.module.css';

function Text({ value }: { value: RichText[] }) {
  return value.map((part, index) => {
    let node: ReactNode = part.text;
    if (part.code) node = <code>{node}</code>;
    if (part.bold) node = <strong>{node}</strong>;
    if (part.italic) node = <em>{node}</em>;
    if (part.strike) node = <s>{node}</s>;
    if (part.href) node = <a href={part.href} rel="noreferrer">{node}</a>;
    return <Fragment key={index}>{node}</Fragment>;
  });
}

export function NotionBody({ blocks }: { blocks: Block[] }) {
  const output: ReactNode[] = [];
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const text = <Text value={block.text} />;
    const children = block.children?.length ? <NotionBody blocks={block.children} /> : null;
    if (['bulleted_list_item', 'numbered_list_item'].includes(block.type)) {
      const items: ReactNode[] = [];
      const start = index;
      while (blocks[index]?.type === block.type) {
        const item = blocks[index];
        items.push(<li key={index}><Text value={item.text} />{item.children?.length ? <NotionBody blocks={item.children} /> : null}</li>);
        index++;
      }
      index--;
      const List = block.type === 'numbered_list_item' ? 'ol' : 'ul';
      output.push(<List key={start}>{items}</List>);
      continue;
    }
    let node: ReactNode;
    switch (block.type) {
      case 'heading_1': node = <h2>{text}</h2>; break;
      case 'heading_2': node = <h3>{text}</h3>; break;
      case 'heading_3': node = <h4>{text}</h4>; break;
      case 'quote': node = <blockquote><p>{text}</p>{children}</blockquote>; break;
      case 'callout': node = <aside className={styles.callout}><p>{text}</p>{children}</aside>; break;
      case 'toggle': node = <details><summary>{text}</summary>{children}</details>; break;
      case 'to_do': node = <div><span aria-label={block.checked ? '已完成' : '待完成'}>{block.checked ? '☑' : '☐'}</span> {text}{children}</div>; break;
      case 'code': node = <pre><code>{block.text.map((part) => part.text).join('')}</code></pre>; break;
      case 'divider': node = <hr />; break;
      case 'image': node = <figure>{/* Local static assets also work on GitHub Pages. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={block.src} alt={block.text.map((part) => part.text).join('')} loading="lazy" />
        {block.text.length ? <figcaption>{text}</figcaption> : null}</figure>; break;
      case 'table': node = <div className={styles.table}><table><tbody>{block.children?.map((row, rowIndex) => <tr key={rowIndex}>{row.cells?.map((cell, colIndex) => {
        const header = (block.columnHeader && rowIndex === 0) || (block.rowHeader && colIndex === 0);
        const Cell = header ? 'th' : 'td';
        return <Cell key={colIndex} scope={header ? (rowIndex === 0 && block.columnHeader ? 'col' : 'row') : undefined}><Text value={cell} /></Cell>;
      })}</tr>)}</tbody></table></div>; break;
      case 'column_list': case 'column': node = <div>{children}</div>; break;
      default: node = <><p>{text}</p>{children}</>;
    }
    output.push(<Fragment key={index}>{node}</Fragment>);
  }
  return <>{output}</>;
}
