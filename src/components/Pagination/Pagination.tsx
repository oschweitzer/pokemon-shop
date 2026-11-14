import { getPageItems } from '../../lib/pagination';
import styles from './Pagination.module.css';
import pageStyles from './Page/Page.module.css';

interface PaginationProps {
  currentPage: number;
  pages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ currentPage, pages, onChange }: PaginationProps) {
  return (
    <nav className={styles.Pagination} aria-label="Pagination">
      <ul>
        {getPageItems(currentPage, pages).map((item) => {
          if (typeof item === 'string') {
            return (
              <li key={item} className={[pageStyles.Page, pageStyles.UnClickable].join(' ')}>
                …
              </li>
            );
          }
          const isCurrent = item === currentPage;
          return (
            <li
              key={item}
              className={[pageStyles.Page, isCurrent ? pageStyles.CurrentPage : '']
                .filter(Boolean)
                .join(' ')}
            >
              {isCurrent ? (
                <span aria-current="page">{item}</span>
              ) : (
                <button
                  type="button"
                  className={pageStyles.PageButton}
                  aria-label={`Page ${item.toString()}`}
                  onClick={() => {
                    onChange(item);
                  }}
                >
                  {item}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
